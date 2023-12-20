<!-- TODO: вернуть ts -->
<script setup>
import { ref, watch, computed } from 'vue';
import { titles } from '@/data/titles';
import { getSortingType } from '@/helpers/getSortingType';
import { getColumnValues } from '@/helpers/getColumnValues';

const tableHeaders = ref(titles);
const serverItems = ref([]); // вероятно должно быть компьютед-свойством (а то тут (по крайней мере в данный момент) много левого движа в компоненте происходит)
const totalItems = ref(0);
const itemsPerPage = ref(10);
const loading = ref(true);
const tableForceRerenderer = ref('');
const uniqueColumnValues = ref([]);
const searchString = ref('');
const checkedValues = ref([]);
const selectedColumnName = ref('');
const deletedItemId = ref('');
const isDialogDeleteOpen = ref(false);
const isDialogCreateOpen = ref(false);

const searchedValues = computed(() => {
  return uniqueColumnValues.value.filter((city) =>
    city.toLowerCase().includes(searchString.value.toLowerCase().trim())
  );
});

watch(checkedValues, () => {
  tableForceRerenderer.value = String(Date.now()); // Это походит на какой-то костыль, но именно так это рекомендуется делать в официальной документации к v-data-table-server
});

watch(selectedColumnName, () => {
  tableForceRerenderer.value = String(Date.now());
  uniqueColumnValues.value = [];
  checkedValues.value = [];
  searchString.value = '';
  getUniqueColumnValues();
});

// В Вуе работа с апи должна происходить в методах жизненного цикла (хотя это коллбэки...). Как в Нуксте - уточни ещё. Ну и скорее всего нужно бы фетч ещё в "юзАсинк" завернуть, чтобы запросы не дублировались. Ну и вообще через стор, по хорошему. Но раз Нукст, приоритетная задача - ССР
// TODO: refactor (+ трай-кэтч... ну и файнали для лоадинга)
async function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true;
  // Енвы, апи
  const abonents = await $fetch('http://localhost:5000/api/abonents', {
    method: 'get',
    params: {
      page,
      itemsPerPage,
      sortingType: getSortingType(sortBy),
      columnName: toRaw(selectedColumnName.value), // TODO: Вот тут словарик прикрути, а принимай русскоязычные значения
      columnValues: getColumnValues(toRaw(checkedValues.value)),
    },
  });
  serverItems.value = abonents.findedAbonents;
  totalItems.value = abonents.totalAbonents;
  loading.value = false;
}

// TODO: refactor (+ трай-кэтч... ну и файнали для лоадинга)
async function getUniqueColumnValues() {
  // Енвы, апи
  const cities = await $fetch(`http://localhost:5000/api/abonents/column/${toRaw(selectedColumnName.value)}`, {
    method: 'get',
  });
  uniqueColumnValues.value = cities;
}

// TODO: refactor
async function deleteNote(noteId) {
  try {
    await $fetch(`http://localhost:5000/api/abonents/${noteId}`, {
      method: 'delete',
    });
    tableForceRerenderer.value = String(Date.now());
  } catch (err) {
    console.error(err);
  }
}

function clearFilters() {
  uniqueColumnValues.value = [];
  checkedValues.value = [];
  selectedColumnName.value = '';
  searchString.value = '';
}

function deleteItem(item) {
  deletedItemId.value = item._id;
  isDialogDeleteOpen.value = true;
}

function closeDeleteDialog() {
  isDialogDeleteOpen.value = false;
}

function deleteItemConfirm() {
  deleteNote(deletedItemId.value);
  deletedItemId.value = '';
  closeDeleteDialog();
}

function openCreateFormModal() {
  isDialogCreateOpen.value = true;
}

function closeCreateFormModal() {
  isDialogCreateOpen.value = false;
}
</script>

<template>
  <!-- Тоже в модалку - третий вариант -->
  <div v-if="selectedColumnName">
    <!-- TODO: Крестик добавить полю, там по-моему через вендорные префиксы можно -->
    <input
      id="search"
      v-model="searchString"
      type="search"
      placeholder="Поиск"
    />
    <ul>
      <li
        v-for="searchedValue in searchedValues.slice(0, 4)"
        :key="searchedValue"
      >
        <label>
          {{ searchedValue }}
          <input
            v-model="checkedValues"
            type="checkbox"
            v-bind:value="searchedValue"
          />
        </label>
      </li>
    </ul>

    <!-- TODO: Строкой: -->
    <span>Выбранные значения для фильтрации: {{ checkedValues }}</span>

    <ui-button
      variant="colored-accent"
      v-on:click="clearFilters"
      >Очистить фильтры</ui-button
    >
  </div>

  <!-- МОДАЛКА ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ (прокидывать пропсом). И сама пусть пропсы принимает. Чего алигн красный? -->
  <!-- И вообще у вас же меняется только содержимое. Надо через ви-иф сделать его отображение, а диалог оставить 1 -->
  <v-dialog
    v-model="isDialogDeleteOpen"
    max-width="300px"
  >
    <v-card>
      <v-card-title
        class="text-h5"
        align="center"
        >Удалить эту запись?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey-lighten-3"
          variant="text"
          v-on:click="closeDeleteDialog"
          >Нет</v-btn
        >
        <v-btn
          color="red-darken-1"
          variant="text"
          v-on:click="deleteItemConfirm"
          >Да</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- МОДАЛКА ДОБАВЛЕНИЯ ЗАПИСИ -->
  <v-dialog
    v-model="isDialogCreateOpen"
    max-width="800px"
  >
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-icon
          size="small"
          v-on:click="closeCreateFormModal"
        >
          mdi-close
        </v-icon>
      </v-card-actions>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <vuetify-form />
    </v-card>
  </v-dialog>

  <!-- 
    Объединение модалок (рефактор):
    1) В слот при вызове кидать разных чилдренов (смотри как в твоей модалке было)
    2) Задание разной максимальной ширины
    3) В форму надо прокидывать силовой ререндер таблицы и закрытие модалки. Хотя второе скорее не
    4) Открытие-закрытие модалки - отдельная логика, не связанная с ее содержимым
  -->

  <!-- Также подумать на счёт работы с ошибками, наверняка там есть и атрибут error, раз есть loading. И текст лоадингу свой сделай -->
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    item-value="name"
    v-bind:search="tableForceRerenderer"
    v-bind:headers="tableHeaders"
    v-bind:items-length="totalItems"
    v-bind:items="serverItems"
    v-bind:loading="loading"
    v-on:update:options="loadItems"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Телефонный справочник</v-toolbar-title>
        <v-spacer />
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <!-- TODO: селект и кнопку выровнять по центру относительно заголовка -->
        <v-select
          v-model="selectedColumnName"
          label="Выберите столбец для фильтрации"
          :items="['surname', 'name', 'email', 'phone', 'city', 'street']"
        />
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-btn
          color="primary"
          dark
          class="mb-2"
          v-on:click="openCreateFormModal"
        >
          Добавить запись
        </v-btn>
      </v-toolbar>
    </template>
    <!-- Разобраться -->
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        v-on:click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table-server>
  <!--
      Ну вот судя по обилию слотов в таблице, наверняка что-то должно быть и в духе "клик по воронке -> контексное меню столбца". Но если не найду и будет время, тогда: попап самодельный и привязанный к конкретному столбцу. Там только нужно будет стоп-пропагейшн на воронку, чтобы не вызывать сортировку столбца. Но самая программа минимум - упихать селект выбора столбца в шапку. А там уж как пойдет.
  -->
</template>
