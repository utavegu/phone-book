// TODO: Типизация везде
// В Вуе работа с апи должна происходить в методах жизненного цикла (хотя это коллбэки...). Как в Нуксте - уточни ещё. Ну и скорее всего нужно бы фетч ещё в "юзАсинк" завернуть, чтобы запросы не дублировались. Ну и вообще через стор, по хорошему. Но раз Нукст, приоритетная задача - ССР
// TODO: refactor (+ трай-кэтч... ну и файнали для лоадинга)
// Файнали для лоадинга.
import { baseUrl } from '..';
import { getColumnValues } from '~/helpers/getColumnValues';
import { getSortingType } from '~/helpers/getSortingType';

const fetchAbonentsApi = async (
  page: any,
  itemsPerPage: any,
  sortBy: any,
  selectedColumnName: any,
  checkedValues: any
): Promise<any> => {
  try {
    const abonents = await $fetch(baseUrl + 'abonents', {
      method: 'get',
      params: {
        page,
        itemsPerPage,
        sortingType: getSortingType(sortBy),
        columnName: selectedColumnName, // TODO: Вот тут словарик прикрути, а принимай русскоязычные значения
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
    const distinctedValues = await $fetch(`${baseUrl}abonents/column/${selectedColumnName}`, {
      method: 'get',
    });

    return distinctedValues;
  } catch (err) {
    console.error(err);
  }
};

const deleteNoteApi = async (noteId: any): Promise<void> => {
  try {
    await $fetch(`http://localhost:5000/api/abonents/${noteId}`, {
      method: 'delete',
    });
  } catch (err) {
    console.error(err);
  }
};

export { fetchAbonentsApi, fetchUniqueColumnValuesApi, deleteNoteApi };
