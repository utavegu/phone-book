<script setup>
import { ref, watch, computed } from 'vue';
import { fetchAbonentsApi, fetchUniqueColumnValuesApi } from '@/api/services/abonentsApi';
import { titles } from '@/data/titles';
import { itemsPerPageVariants } from '@/data/itemsPerPageVariants';

const tableHeaders = ref(titles);
const serverItems = ref([]);
const totalItems = ref(0);
const itemsPerPage = ref(5);
const loading = ref(true);
const revalidateDataHandler = ref('');
const uniqueColumnValues = ref([]);
const searchString = ref('');
const checkedValues = ref([]);
const selectedColumnName = ref('');
const deletedItemId = ref('');
const isDialogOpened = ref(false);
const action = ref('');
const columnValuesLoading = ref(true);
const itemsPerPageOptions = ref(itemsPerPageVariants);

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
  if (abonents) {
    serverItems.value = abonents.findedAbonents;
    totalItems.value = abonents.totalAbonents;
    loading.value = false;
  }
}

async function getUniqueColumnValues(columnName) {
  columnValuesLoading.value = true;
  uniqueColumnValues.value = await fetchUniqueColumnValuesApi(columnName);
  columnValuesLoading.value = false;
}

function clearFilters() {
  checkedValues.value = [];
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
    >
      <vuetify-form
        v-on:close-dialog="closeDialog"
        v-on:revalidate-data="revalidateData"
      />
    </cards-create-note>
  </v-dialog>

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    v-model:items-per-page-options="itemsPerPageOptions"
    items-per-page-text="Абонентов на странице:"
    item-value="name"
    v-bind:search="revalidateDataHandler"
    v-bind:headers="tableHeaders"
    v-bind:items-length="totalItems"
    v-bind:items="serverItems"
    v-bind:loading="loading"
    loading-text="Данные загружаются..."
    no-data-text="Данных нет"
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
                <v-container v-if="!columnValuesLoading">
                  <v-text-field
                    v-model="searchString"
                    v-bind:loading="columnValuesLoading"
                    density="compact"
                    variant="outlined"
                    label="Поиск"
                    append-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-list v-if="searchedValues.length">
                    <v-list-item
                      v-for="searchedValue in searchedValues.slice(0, 4)"
                      v-bind:key="searchedValue"
                    >
                      <v-checkbox
                        v-model="checkedValues"
                        v-bind:label="searchedValue"
                        v-bind:value="searchedValue"
                        density="compact"
                        hide-details
                      ></v-checkbox>
                    </v-list-item>
                  </v-list>
                  <v-card-item v-else>Значения не найдены!</v-card-item>
                  <v-container v-if="checkedValues.length">
                    <v-divider />
                    <v-card-subtitle>Выбранные фильтры:</v-card-subtitle>
                    <v-list>
                      <v-list-item
                        v-for="checkedValue in checkedValues"
                        v-bind:key="checkedValue"
                      >
                        {{ checkedValue }}
                      </v-list-item>
                    </v-list>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        variant="outlined"
                        color="blue-darken-1"
                        v-on:click="clearFilters"
                      >
                        Очистить фильтры
                      </v-btn>
                    </v-card-actions>
                  </v-container>
                </v-container>
                <v-progress-linear v-else />
              </v-card>
            </v-menu>
          </td>
        </template>
      </tr>
    </template>

    <template v-slot:top>
      <vuetify-toolbar
        title="Телефонный справочник"
        v-on:open-create-form-modal="createItem"
      />
    </template>

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
