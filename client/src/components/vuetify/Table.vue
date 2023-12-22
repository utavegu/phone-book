<!-- TODO: вернуть ts -->
<script setup>
import { ref, watch, computed } from 'vue';
import { titles } from '@/data/titles';
import { fetchAbonentsApi, fetchUniqueColumnValuesApi } from '@/api/services/abonentsApi';

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
const isDialogOpened = ref(false);
const action = ref(''); // TODO: енумка

const searchedValues = computed(() => {
  return uniqueColumnValues.value.filter((city) =>
    city.toLowerCase().includes(searchString.value.toLowerCase().trim())
  );
});

watch(checkedValues, () => {
  revalidateData();
});

watch(selectedColumnName, async (columnName) => {
  await getUniqueColumnValues(columnName);
  if (checkedValues.value.length) {
    checkedValues.value = [];
  }
  searchString.value = '';
});

function revalidateData() {
  revalidateDataHandler.value = String(Date.now()); // Это походит на какой-то костыль, но именно так это рекомендуется делать в официальной документации к v-data-table-server
}

async function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true;
  const abonents = await fetchAbonentsApi(page, itemsPerPage, sortBy, selectedColumnName.value, checkedValues.value);
  // !!! findedAbonents (теряет их через раз) (следи так, пообновляй страницу разиков 20 подряд и поконсоль значения)
  if (abonents) {
    serverItems.value = abonents.findedAbonents;
    totalItems.value = abonents.totalAbonents;
    loading.value = false;
  }
}

async function getUniqueColumnValues(columnName) {
  // TODO: лоадинг тоже можно прямо тут добавить. А ошибка - отдавать из апи, если есть.
  uniqueColumnValues.value = await fetchUniqueColumnValuesApi(columnName);
}

function clearFilters() {
  checkedValues.value = [];
  selectedColumnName.value = '';
  searchString.value = '';
}

function openDialog() {
  isDialogOpened.value = true;
}

function closeDialog() {
  isDialogOpened.value = false;
}

function deleteItem(item) {
  deletedItemId.value = item._id;
  action.value = 'delete';
  openDialog();
}

function createItem() {
  action.value = 'create';
  openDialog();
}

function toggleFilter(columnHeading) {
  selectedColumnName.value = columnHeading.key;
}
</script>

<template>
  <v-dialog
    v-model="isDialogOpened"
    v-bind:max-width="action === 'delete' ? '300px' : '680px'"
  >
    <cards-delete-note
      v-if="action === 'delete'"
      v-bind:deleted-item-id="deletedItemId"
      v-on:close-dialog="closeDialog"
      v-on:revalidate-data="revalidateData"
    />

    <cards-create-note
      v-if="action === 'create'"
      v-on:close-dialog="closeDialog"
    />
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
    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
      <tr>
        <template
          v-for="column in columns"
          v-bind:key="column.key"
        >
          <td>
            <div
              class="mr-2 cursor-pointer"
              v-on:click="() => toggleSort(column)"
            >
              {{ column.title }}
            </div>
            <template v-if="isSorted(column)">
              <v-icon v-bind:icon="getSortIcon(column)" />
            </template>
            <v-icon
              v-if="column.filtrable"
              v-bind:id="column.key"
              v-on:click.stop="toggleFilter(column)"
            >
              mdi-filter
            </v-icon>

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
                <!-- TODO: Строкой и в столбик (<v-list>-<v-list-item>) - мапить -->
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
          </td>
        </template>
      </tr>
    </template>

    <template v-slot:top>
      <table-toolbar
        title="Телефонный справочник"
        v-on:open-create-form-modal="createItem"
      />
    </template>

    <!-- Разобраться -->
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
      <v-tooltip text="Удалить запись">
        <template v-slot:activator="{ props }">
          <v-icon
            size="small"
            v-bind="props"
            v-on:click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-tooltip>
    </template>
  </v-data-table-server>
</template>
