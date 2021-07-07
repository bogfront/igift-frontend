export const YANDEX_MAP_SRC = 'https://api-maps.yandex.ru/2.1/?apikey=dffbe29d-b836-45c5-9a5a-691d2ddffc13&lang=ru_RU'

export const STATUSES = {
  CREATED: 'created',
  FINISHED: 'finished',
  WAITING_INCOMING: 'waiting_incoming',
  PARTLY_INCOMING: 'partly_incoming',
  WORKING: 'working',
  DRAFT: 'draft',
  CANCEL: 'cancel',
  PARTLY_CANCEL: 'partly_cancel',
  REDEMPTION: 'redemption'
}

export const STATUSES_RUS = {
  created: 'Создан',
  finished: 'Выполнен ',
  waiting_incoming: 'Ожидаем на складе',
  partly_incoming: 'Частично поступил на склад',
  working: 'В работе',
  draft: 'Черновик',
  cancel: 'Отказ',
  partly_cancel: 'Частично поступил на склад + отказ',
  redemption: 'Заявка на выкуп'
}
