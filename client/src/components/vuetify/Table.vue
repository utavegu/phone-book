<!-- TODO: вернуть ts -->
<script setup lang="js">
import { ref, watch, computed } from 'vue';
import { titles } from '@/data/titles';
import { getSortingType } from '@/helpers/getSortingType';
import { getColumnValues } from '@/helpers/getColumnValues';

// Нэйминг
const tableHeaders = ref(titles);
const serverItems = ref([]); // вероятно должно быть компьютед-свойством
const totalItems = ref(0);
const itemsPerPage = ref(3);
const loading = ref(true);
const tableForceRerenderer = ref('');
const uniqueColumnValues = ref([]);
const searchString = ref('');
const checkedValues = ref([]);
const selectedColumnName = ref('');

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

// В Вуе работа с апи должна происходить в методах жизненного цикла (хотя это коллбэки...). Как в Нуксте - уточни ещё. Ну и скорее всего нужно бы фетч ещё в "юзАсинк" завернуть, чтобы запросы не дублировались
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

async function getUniqueColumnValues() {
  // Енвы, апи
  const cities = await $fetch(`http://localhost:5000/api/abonents/column/${toRaw(selectedColumnName.value)}`, {
    method: 'get',
  });
  uniqueColumnValues.value = cities;
}

function clearFilters() {
  uniqueColumnValues.value = [];
  checkedValues.value = [];
  selectedColumnName.value = '';
  searchString.value = '';
}
</script>

<template>
  <v-select
    label="Выберите столбец для фильтрации"
    v-model="selectedColumnName"
    :items="['surname', 'name', 'email', 'phone', 'city', 'street']"
  />

  <div v-if="selectedColumnName">
    <!-- TODO: Крестик добавить полю, там по-моему через вендорные префиксы можно -->
    <input
      id="search"
      type="search"
      placeholder="Поиск"
      v-model="searchString"
    />
    <ul>
      <li
        v-for="searchedValue in searchedValues.slice(0, 4)"
        :key="searchedValue"
      >
        <label>
          {{ searchedValue }}
          <input
            type="checkbox"
            v-bind:value="searchedValue"
            v-model="checkedValues"
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

  <!-- Также подумать на счёт работы с ошибками, наверняка там есть и атрибут error, раз есть loading. И текст лоадингу свой сделай -->
  <v-data-table-server
    item-value="name"
    v-model:items-per-page="itemsPerPage"
    v-bind:search="tableForceRerenderer"
    v-bind:headers="tableHeaders"
    v-bind:items-length="totalItems"
    v-bind:items="serverItems"
    v-bind:loading="loading"
    v-on:update:options="loadItems"
  />
  <!--
      Есть вариант сделать таблицу с закрывающим тэгом и передать туда чилдрены, в них можно выбрать месторасположение для отображение, вероятно там может быть и вариант "попап для выбранного столбца" - изучай АПИ
      Но, в принципе, вырвать его и показывать по клику на воронку тоже не особо сложная задача, если что. Только нужно будет стоп-пропагейшн сортировки делать тогда
      Фифти-фифти можно фильтры модалкой сделать ещё, как вариант.
  -->
</template>
