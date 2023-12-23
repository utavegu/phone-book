// TODO: Типизация везде
// В Вуе работа с апи должна происходить в методах жизненного цикла (хотя это коллбэки...). Как в Нуксте - уточни ещё. Ну и скорее всего нужно бы фетч ещё в "юзАсинк" завернуть, чтобы запросы не дублировались. Ну и вообще через стор, по хорошему. Но раз Нукст, приоритетная задача - ССР
// TODO: refactor (+ трай-кэтч... ну и файнали для лоадинга)
// Файнали для лоадинга.
import { getColumnValues } from '~/helpers/getColumnValues';
import { getSortingType } from '~/helpers/getSortingType';

const baseUrl = 'http://localhost:5000/api/';
// По хорошему вот отсюда должно доставаться - useRuntimeConfig().public.apiBase). Но как его вынуть тут, а не в компоненте - не дожал.

const fetchAbonentsApi = async (
  page: any,
  itemsPerPage: any,
  sortBy: any,
  selectedColumnName: any,
  checkedValues: any
): Promise<any> => {
  try {
    const abonents = await $fetch('abonents', {
      baseURL: baseUrl,
      method: 'get',
      params: {
        page,
        itemsPerPage,
        sortingType: getSortingType(sortBy),
        columnName: selectedColumnName,
        columnValues: getColumnValues(checkedValues),
      },
    });

    return abonents;
  } catch (err) {
    console.error(err);
  }
};

const fetchUniqueColumnValuesApi = async (selectedColumnName: any): Promise<any> => {
  try {
    // TODO: На сервере фортифицировать кейс с пустым селектедКолумн! (возникает при "очистить фильтры") (не делать запрос в базу, если строка пустая?)
    const distinctedValues = await $fetch(`abonents/column/${selectedColumnName}`, {
      baseURL: baseUrl,
      method: 'get',
    });

    return distinctedValues;
  } catch (err) {
    console.error(err);
  }
};

const deleteNoteApi = async (noteId: any): Promise<void> => {
  try {
    await $fetch(`abonents/${noteId}`, {
      baseURL: baseUrl,
      method: 'delete',
    });
  } catch (err) {
    console.error(err);
  }
};

const createAbonentApi = async (values: any): Promise<void> => {
  try {
    await $fetch(`abonents`, {
      baseURL: baseUrl,
      method: 'post',
      body: {
        ...values,
        house: values.house && Number(values.house),
        flat: values.flat && Number(values.flat),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export { fetchAbonentsApi, fetchUniqueColumnValuesApi, deleteNoteApi, createAbonentApi };
