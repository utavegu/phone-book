const mockAbonent = {
  surname: 'Васильева',
  name: 'Анна',
  patronymic: 'Анатольевна',
  phone: '8-922-134-24-75',
  email: 'test@mail.ru',
  city: 'Москва',
  street: 'Ленина',
  house: 3,
  flat: 57,
};

const mockId = '63ce577c4ae871832103a9c3';

const mockQueryParams = {
  itemsPerPage: '5',
  page: '1',
  sortingType: '{ surname: SortingOrders.DESC }',
  columnName: 'city',
  columnValues: 'Москва,Екатеринбург',
};

const mockArrayOfCities = ['Москва', 'Екатеринбург'];

const mockColumnName = 'city';

export {
  mockAbonent,
  mockId,
  mockQueryParams,
  mockArrayOfCities,
  mockColumnName,
};
