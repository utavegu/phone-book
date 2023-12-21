<!-- TODO: вернуть ts -->
<script setup>
import { ref, watch, computed } from 'vue';
import { titles } from '@/data/titles';
import { fetchAbonentsApi, fetchUniqueColumnValuesApi, deleteNoteApi } from '@/api/services/abonentsApi';

const tableHeaders = ref(titles);
const serverItems = ref([]); // вероятно должно быть компьютед-свойством (а то тут (по крайней мере в данный момент) много левого движа в компоненте происходит)
const totalItems = ref(0);
const itemsPerPage = ref(10);
const loading = ref(true);
const revalidateDataHandler = ref('');
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
  revalidateDataHandler.value = String(Date.now()); // Это походит на какой-то костыль, но именно так это рекомендуется делать в официальной документации к v-data-table-server
});

watch(selectedColumnName, async (columnName) => {
  await getUniqueColumnValues(columnName);
  if (checkedValues.value.length) {
    checkedValues.value = [];
  }
  searchString.value = '';
});

async function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true;
  const abonents = await fetchAbonentsApi(page, itemsPerPage, sortBy, selectedColumnName.value, checkedValues.value);
  // !!! findedAbonents (теряет их через раз) (следи так)
  if (abonents) {
    serverItems.value = abonents.findedAbonents;
    totalItems.value = abonents.totalAbonents;
    loading.value = false;
  }
}

async function getUniqueColumnValues(columnName) {
  uniqueColumnValues.value = await fetchUniqueColumnValuesApi(columnName);
}

async function deleteNote(noteId) {
  await deleteNoteApi(noteId);
  revalidateDataHandler.value = String(Date.now());
}

function clearFilters() {
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

function toggleFilter(columnHeading) {
  selectedColumnName.value = columnHeading.key;
}
</script>

<template>
  <!-- МОДАЛКА ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ (прокидывать пропсом). И сама пусть пропсы принимает. Чего алигн красный? Депрекейтед? -->
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
          color="blue-darken-1"
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

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    item-value="name"
    v-bind:search="revalidateDataHandler"
    v-bind:headers="tableHeaders"
    v-bind:items-length="totalItems"
    v-bind:items="serverItems"
    v-bind:loading="loading"
    v-on:update:options="loadItems"
  >
    <template
      v-for="(item, index) in ['surname', 'name', 'patronymic', 'email', 'phone', 'city']"
      v-bind:key="index"
      v-slot:[`header.${item}`]="{ column }"
    >
      {{ column.title }}
      <v-btn
        v-bind:id="column.key"
        color="primary"
        size="x-small"
        v-on:click.stop="toggleFilter(column)"
      >
        <v-icon small> mdi-filter-variant </v-icon>
      </v-btn>

      <v-menu
        v-bind:close-on-content-click="false"
        v-bind:activator="`#${column.key}`"
      >
        <v-card>
          <v-text-field
            v-model="searchString"
            v-bind:loading="loading"
            density="compact"
            variant="outlined"
            label="Поиск"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
          ></v-text-field>
          <!-- TODO: Тут бы лоадинг показывать, если значения ещё не подъехали -->
          <v-list>
            <v-list-item
              v-for="searchedValue in searchedValues.slice(0, 4)"
              v-bind:key="searchedValue"
            >
              <label>
                {{ searchedValue }}
                <input
                  v-model="checkedValues"
                  type="checkbox"
                  v-bind:value="searchedValue"
                />
              </label>
            </v-list-item>
          </v-list>
          <!-- TODO: Строкой -->
          <span>Выбранные значения для фильтрации: {{ checkedValues }}</span>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="elevated"
              v-on:click="clearFilters"
            >
              Очистить фильтры
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>

    <template v-slot:top>
      <table-toolbar
        title="Телефонный справочник"
        v-on:open-create-form-modal="openCreateFormModal"
      />
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
</template>
