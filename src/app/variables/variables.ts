export const DEALS_STATUS = [
  {
    type: 'in_process',
    value: 'В работе'
  },
  {
    type: 'failed',
    value: 'Провалено'
  },
  {
    type: 'completed',
    value: 'Успешно завершено'
  }
];

export const TYPE_FIZLICO = [
  {
    type: 'yp',
    value: 'ИП (Индивидуальный предприниматель)'
  },
  {
    type: 'lpr',
    value: 'ЛПР (Лицо принимающее решение)'
  },
  {
    type: 'lvr',
    value: 'ЛВР (Лицо влияющее на решение)'
  }
];

export const TYPE_YURLICO = [
  {
    type: 'kom_org',
    value: 'Коммерческая организация'
  },
  {
    type: 'nekom_org',
    value: 'Некоммерческая организация'
  },
  {
    type: 'gos_pred',
    value: 'Государственное предприятие'
  },
  {
    type: 'gos_uchr',
    value: 'Государственное учреждение'
  }
];

export const FORMS_YURLICO = [
  {
    type: 'too',
    value: 'ТОО'
  },
  {
    type: 'ooo',
    value: 'ООО',
  },
  {
    type: 'tdo',
    value: 'ТДО'
  },
  {
    type: 'odo',
    value: 'ОДО'
  },
  {
    type: 'ao',
    value: 'АО'
  },
  {
    type: 'oao',
    value: 'ОАО'
  },
  {
    type: 'zao',
    value: 'ЗАО'
  },
  {
    type: 'gu',
    value: 'ГУ'
  },
  {
    type: 'fgp',
    value: 'ФГП'
  },
  {
    type: 'fgup',
    value: 'ФГУП'
  },
  {
    type: 'gup',
    value: 'ГУП'
  },
  {
    type: 'phv',
    value: 'ПХВ'
  },
  {
    type: 'mp',
    value: 'МП'
  },
  {
    type: 'kt',
    value: 'КТ'
  },
  {
    type: 'tszh',
    value: 'ТСЖ'
  },
  {
    type: 'chp',
    value: 'ЧП'
  }
];

export const TYPE_PHONE = [
  {
    type: 'job',
    value: 'Рабочий'
  },
  {
    type: 'private',
    value: 'Личный'
  },
  {
    type: 'home',
    value: 'Домашний'
  }
];

export const TYPE_EMAIL = [
  {
    type: 'corporate',
    value: 'Корпоративная'
  },
  {
    type: 'personal',
    value: 'Персональная'
  }
];

export const TASKS_STATUS = [
  {
    type: 'in_process',
    value: 'В работе'
  },
  {
    type: 'done',
    value: 'Выполненная задача'
  },
  {
    type: 'failed',
    value: 'Проваленная задача'
  },
  {
    type: 'verifying',
    value: 'Задача на проверке'
  }
];

export const TASKS_PRIORITY = [
  {
    type: 'hot',
    value: 'Важная задача'
  },
  {
    type: 'middle',
    value: 'Плановая задача'
  },
  {
    type: 'cold',
    value: 'Может подождать'
  }
];

export const DATEPICKER_RU_LOCALE = {
  firstDayOfWeek: 0,
  dayNames: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
  monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "May", "Июн","Июл", "Авг", "Сен", "Окт", "Нов", "Дек" ],
  today: 'Сегодня',
  clear: 'Очистить'
};
