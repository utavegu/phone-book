1) Только при первом старте всегда выкинет ошибку: "FetchError: [GET] "http://localhost:5000/api/abonents?page=1&itemsPerPage=10&sortingType=%7B%22surname%22:%22asc%22%7D&columnName&columnValues": <no response> fetch failed", однако никаких других проблем нет, кроме того, что она тут вылетает. И только на сервере, не в браузере.

2) При сортировке столбца имён или если если сортировка другого столбца вызовет отображение дуюлирующихся значений выборки в столбце имени. Странно, так как в других столбцах также попадаются неуникальные значения.
[Vue warn]: Duplicate keys found during update: "item_Алексей" Make sure keys are unique. 
(консоль браузера)

3) Warning: Hydration children mismatch in <div>: server rendered element contains fewer child nodes than client vdom. (консоль браузера)

4) Во время препродакшн сборки контейнера клиента:
MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 close listeners added to [TLSSocket]. Use emitter.setMaxListeners() to increase limit ()

5) Не совсем понятно почему стартер Накст-а часть зависимостей устанавливает в дев-депенденсиз. Видимо у них какая-то тактика - оставляю как есть.