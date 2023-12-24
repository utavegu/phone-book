import { getColumnValues } from '~/helpers/getColumnValues';
import { getSortingType } from '~/helpers/getSortingType';
import type { IAbonent } from '~/typespaces/interfaces/IAbonent';

const baseUrl = 'http://localhost:5000/api/';
// По хорошему вот отсюда должно доставаться - useRuntimeConfig().public.apiBase). Но как его вынуть тут, а не в компоненте - не дожал.

const fetchAbonentsApi = async (
  page: number,
  itemsPerPage: number,
  sortBy: any,
  selectedColumnName: string,
  checkedValues: string[]
): Promise<IAbonent[] | void> => {
  try {
    const abonents = await $fetch<IAbonent[]>('abonents', {
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

const fetchUniqueColumnValuesApi = async (selectedColumnName: string): Promise<string[] | void> => {
  try {
    const distinctedValues = await $fetch<string[]>(`abonents/column/${selectedColumnName}`, {
      baseURL: baseUrl,
      method: 'get',
    });

    return distinctedValues;
  } catch (err) {
    console.error(err);
  }
};

const deleteNoteApi = async (noteId: string): Promise<void> => {
  try {
    await $fetch(`abonents/${noteId}`, {
      baseURL: baseUrl,
      method: 'delete',
    });
  } catch (err) {
    console.error(err);
  }
};

const createAbonentApi = async (values: Omit<IAbonent, '_id'>): Promise<IAbonent | void> => {
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
