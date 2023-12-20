// TODO: Вот ещё, кстати, потенциальное место, где можно поискать опцию для показа воронки (фильтрация). Если успеешь - сделаешь через воронку вызов фильтров (нужно будет перехватывать всплытие, чтобы сортировку не вызвать). Если нет - логика уже вся рабочая.
export const titles = [
  // {
  //   title: 'ID',
  //   key: '_id',
  //   align: 'start',
  //   sortable: true,
  // },
  {
    title: 'Фамилия',
    key: 'surname',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Имя',
    key: 'name',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Отчество',
    key: 'patronymic',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Почта',
    key: 'email',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Телефон',
    key: 'phone',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Город',
    key: 'city',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Улица',
    key: 'street',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Дом',
    key: 'house',
    align: 'center',
    sortable: false,
  },
  {
    title: 'Квартира',
    key: 'flat',
    align: 'center',
    sortable: false,
  },
  {
    title: '',
    key: 'actions',
    align: 'center',
    sortable: false,
  },
];
