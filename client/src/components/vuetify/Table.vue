<template>
  <!-- Также подумать на счёт работы с ошибками, наверняка там есть и атрибут error, раз есть loading -->
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
  -->

  <!-- Переделывай на свой ui-select. По выбранному полю подгружаешь список значений. Данные для выпадашки делай на основании titles с вычетом значений для дома и квартиры. Имхо - это несколько перебор -->
  <button v-on:click="getUniqueColumnValues">Запросить уникальный список городов</button>
  <div>
    <!-- Крестик добавить полю, там по-моему через вендорные префиксы можно -->
    <input
      type="search"
      placeholder="Искать"
      v-model="searchString"
    />
    <ul>
      <li
        :key="city"
        v-for="city in searchedCityes.slice(0, 4)"
      >
        <label>
          {{ city }}
          <input
            type="checkbox"
            v-bind:value="city"
            v-model="checkedCities"
          />
        </label>
      </li>
    </ul>
  </div>
  <!-- TODO: Строкой: -->
  <span>Выбранные значения для фильтрации: {{ checkedCities }}</span>
</template>

<!-- TODO: вернуть ts -->
<script setup lang="js">
import { ref, watch, computed } from 'vue';
import { titles } from '@/data/titles';
import { getSortingType } from '@/helpers/getSortingType';
import { getColumnValues } from '@/helpers/getColumnValues';

// Нэйминг
const itemsPerPage = ref(3);
const tableHeaders = ref(titles);
const serverItems = ref([]); // вероятно должно быть компьютед-свойством
const loading = ref(true);
const totalItems = ref(0);
const uniqueCities = ref([]);
const tableForceRerenderer = ref('');
const searchString = ref('');
const checkedCities = ref([]);

const searchedCityes = computed(() => {
  return uniqueCities.value.filter((city) => city.toLowerCase().includes(searchString.value.toLowerCase().trim()));
});

async function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true;
  // Енвы, апи
  const abonents = await $fetch('http://localhost:5000/api/abonents', {
    method: 'get',
    params: {
      page,
      itemsPerPage,
      sortingType: getSortingType(sortBy),
      columnName: 'city',
      columnValues: getColumnValues(toRaw(checkedCities.value)),
    },
  });
  serverItems.value = abonents.findedAbonents;
  totalItems.value = abonents.totalAbonents;
  loading.value = false;
}

async function getUniqueColumnValues() {
  // Енвы, апи
  const cities = await $fetch('http://localhost:5000/api/abonents/column/city', {
    method: 'get',
  });
  uniqueCities.value = cities;
}

// TODO: Аналогичное нужно будет для имени столбца
watch(checkedCities, () => {
  tableForceRerenderer.value = String(Date.now()); // Это походит на какой-то костыль, но именно так это рекомендуется делать в официальной документации к v-data-table-server
});
</script>
