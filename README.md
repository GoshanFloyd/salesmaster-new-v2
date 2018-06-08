# SalesMaster CRM - Frontend part
Данный репозиторий содержит исходный код SalesMaster CRM. Данная система создана для отслеживания процесса продаж, 
имеет простой функционал менеджера задач и файлового хранилица, а так-же позволяет проводить аналитику по компонания и 
отдельным пользователям.

# Используемые библиотеки и фреймворк

Перечень всех используемых библиотек можно посмотреть в файле `package.json`. 

Основным фреймфорком для разработки используется [Angular](https://angular.io).

Так же используются компоненты [Prime NG](https://www.primefaces.org/primeng/), библиотеки - 
[JQuery](https://jquery.com/) и [FullCalendar](https://fullcalendar.io/), web-клиент сервиса 
[Centrifuge](https://github.com/centrifugal/centrifuge-js), компоненты 
[ng2-dragula](https://github.com/valor-software/ng2-dragula),
[ng2-img-cropper](https://github.com/cstefanache/angular2-img-cropper).

# Основные понятия и термины в исходном коде

`components` - данная директория содержит все компоненты, которые реализуют логическую и визуальную часть функционала.
Деляться на два типа - `*.component.ts` и `*.page.ts`. Первое определение - сам компонент, второе - это компонент страницы,
которая выводит только определенные компоненты, согласно своему названию и функционалу.

`services` - данная директория содержит все сервисы, основная цель которых - иметь только один экземпляр класса 
и реализовавывать логику REST-API и пользовать многократно использовать данные функции во многих компонентах. Так же здесь
хранятся вспомогательные сервисы для отправки уведомлений и слежения за уровненм звука.

`providers` - данная директория содержит файлы провайдеров системы, которые реализуют слежение за состоянием системы и
HTTP-запросами.

`pipes` - данная директория содержит все фильтры для модели данных (в основном используется для вывода данных на темплейт).

`guards` - данная директория содержит все middleware-классы, которые реализуют логику защиты доступа к определенным частям
системы и регулируют аутентификацию пользователя в системе.

`variables` - данная директория содержит системные константы и переменные.

`models` - данная директория содержит модели данных, используемых для работы с теми данными, что возвращает серверная 
часть приложения.

# Описание моделей данных и их методов

## Модель `UserModel`
  ### Поля модели
  `_id` - Уникальный идентификатор пользователя. Тип: `number`. Модификатор доступа: `private`.  
  `_user` - подробная информация о пользователе. Тип: `TypeUserInfo`. Модификатор доступа: `private`.  
  `_type` - тип пользователя в системе. Используется для определения прав доступа. Тип: `string`. Модификатор доступа: `private`.  
  `_company` - массив компаний, в число которых входит данных пользователь. Тип: `TypeGroupArray`. Модификатор доступа: `private`.  
  `_gender` - пол пользователя. Тип: `string`. Модификатор доступа: `private`.
  
  ### Методы класса
  
  `get id(): number` - Возвращает ID текущего пользователя.  
  `get fullname(): string` - Возвращает полное имя текущего пользователя.  
  `get user(): TypeUserInfo` - Возвращает полную информацию о текущем пользователе.  
  `get type(): string` - Возвращает тип текущего пользователя.  
  `get avatar(): string` - Возвращает аватар(URL-ссылку) текущего пользователя.  
  `get company(): TypeGroupArray` - Возвращает массив компаний текущего пользователя.  
  `get gender(): string` - Возвращает пол текущего пользователя.  
  `get genderString(): string` - Возвращает пол текущего пользователя в удобночитаемом виде.  
  `public getDefaultCompany(): GroupItem` - Возвращает стандартную(первую в списке) компанию текущего пользователя.  
  `static parseJwt(token)` - Возвращает расшифрованный токен авторизированного пользователя.  
  `static fromArray(array: any): Array<UserModel>` - Возвращает массис пользователей в виде массива моделей.
  
## Модель `ClientModel`  
  ### Поля модели
  `_id` - Уникальный идентификатор клиента. Тип: `number`. Модификатор доступа: `private`.  
  `_region_id` - ID региона, к которому привязан клиент. Тип: `number`. Модификатор доступа: `private`.
  `_company` - Компания, к которой прикреплен данных клиент. Тип: `CompanyField`. Модификатор доступа: `private`.  
  `_employee` - Пользователь, который создал этого клиента в CRM. Тип: `EmployeeField`. Модификатор доступа: `private`.  
  `_parent` - Клиент-родитель. Так-же может отсутвовать (иметь значение `null`). Тип: `ParentField`. Модификатор доступа: `private`.  
  `_type` - Тип клиента. Может быть либо `"fizlico"` (Физическое либо), либо `"yurlico"`(Юридическое лицо). Тип: `string`. Модификатор доступа: `private`.  
  `_title` - Наименование клиента. Тип: `string`. Модификатор доступа: `private`.  
  `_street` - Адрес клиента. Тип: `string`. Модификатор доступа: `private`.   
  `_postcode` - Почтовый индекс. Тип: `string`. Модификатор доступа: `private`.  
  `_requisite` - Реквизиты клиента. Тип: `string`. Модификатор доступа: `private`.  
  `_fizlico_type` - Тип физического лица. Все типы описаны в константе `TYPE_FIZLICO`. Тип: `string`. Модификатор доступа: `private`.  
  `_yurlico_type` - Тип юридического лица. Все типы описаны в константе `TYPE_YURLICO`. Тип: `string`. Модификатор доступа: `private`.  
  `_yurlico_form` - Форма юридического лица. Все формы описаны к константе `FORMS_YURLICO`. Тип: `string`. Модификатор доступа: `private`.  
  `_phones` - Список телефонов клиента. Тип: `PhoneArrayField`. Модификатор доступа: `private`.  
  `_emails` - Список email-адресов клиента. Тип: `EmailArrayField`. Модификатор доступа: `private`.  
  `_customfields` - Список кастомных полей клиента. Тип: `CustomFieldsArrayField`. Модификатор доступа: `private`.
  `_datetime_created` - Дата создания клиента. Тип: `Date`. Модификатор доступа: `private`.  
  `_datetime_updated` - Дата редактирования клиента. Тип: `Date`. Модификатор доступа: `private`.  
  
  ### Методы класса
  
  `public static getClientArray(array: any): ClientModel[]` - Возвращает массив клиентов в виде массива моделей.    
  `public static getTypeMail(type: string): string` - Возвращает тип emails-адреса.  
  `public static getTypePhone(type: string): string` - Возвращает тип телефона.  
  `get id(): number` - Возвращает ID клиента.  
  `get region_id(): number` - Возвращает ID региона, в котором состоит клиент.  
  `get company(): CompanyField` - Возвращает компанию, к которой относится клиент.  
  `get employee(): EmployeeField` - Возвращает автора данного клиента.  
  `get parent(): ParentField` - Возвращает клиента-родителя.  
  `get type(): string` - Возвращает тип данного клиента.  
  `get title(): string` - Возвращает наименование клиента.  
  `get street(): string` - Возвращает адрес клиента.  
  `get postcode(): string` - Возвращает почтовый индекс клиента.  
  `get requisite(): string` - Возвращает реквизиты клиента.  
  `get fizlico_type(): string` - Возвращает тип физического лица клиента.  
  `get yurlico_type(): string` - Возвращает тип юридического лица клиента.  
  `get yurlico_form(): string` - Возвращает форму юридического лица клиента.    
  `get phones(): PhoneArrayField` - Возвращает массив телефонов клиента.  
  `get emails(): EmailArrayField` - Возвращает массив email-адресов клиента.  
  `get customfields(): CustomFieldsArrayField` - Возращает массив кастомных полей клиента.  
  `get datetime_created(): Date` - Возвращает дату создания клиента.  
  `get datetime_updated(): Date` - Возвращает дату редактирование клиента.  
  `get datetime_created_format(): string` - Возвращает дату создания клиента в строковом значении.  
  `get isParent(): boolean` - Возращает `true`, если клиент не имеет родителя.  
  `get isNewClient(): boolean` - Возращает `true`,  если клиент был создан не более 15 минут назад.

## Модель `ClientLightModel`
  ### Поля модели
  `_id` - Уникальный идентификатор клиента. Тип: `number`. Модификатор доступа: `private`.  
  `_title` - Наименование клиента. Тип: `string`. Модификатор доступа: `private`.  
  `_datetime_created` - Дата создания клиента. Тип: `Date`. Модификатор доступа: `private`.  
  
  ### Методы класса
  
  `public static getClientArray(array: any): ClientLightModel[]` - Возвращает массив клиентов в виде массива моделей.  
  `get id(): number` - Возвращает ID клиента.  
  `get title(): string` - Возвращает наименование клиента.  
  `get datetime_created(): Date` - Возвращает дату создания клиента.  
  `set id(id: number)` - Устанавливает ID для данного экземпляра класса.  
  `set title(title: string)` - Устанавливает наименование для данного экземпляра класса.  
  `set datetime_created(datetime_created: Date)` - Устанавливает дату создания для данного экземпляра класса.  
  
## Модель `DealModel`
  ### Поля модели
  `_id` - Уникальный идентификатор сделки. Тип: `number`. Модификатор доступа: `private`.  
  `_employee` - Автор сделки. Тип: `EmployeeObject`. Модификатор доступа: `private`.  
  `_client` - Клиент, к которому прикреплена сделка. Тип: `ClientObject`. Модификатор доступа: `private`.  
  `_product` - Продукты данной сделки. Тип: `ProductArray`. Модификатор доступа: `private`.  
  `_stage_id` - ID стадии, к которой относится данная сделка. Тип: `number`. Модификатор доступа: `private`.  
  `_title` - Наименование сделки. Тип: `string`. Модификатор доступа: `private`.  
  `_description` - Описание сделки. Тип: `string`. Модификатор доступа: `private`.  
  `_status` - Статус сделки. Все статусы описаны в константе `DEALS_STATUS`. Тип: `string`. Модификатор доступа: `private`.  
  `_total` - Сумма сделки. Тип: `number`. Модификатор доступа: `private`.  
  `_datetime_created` - Дата создания сделки. Тип: `Date`. Модификатор доступа: `private`.  
  `_datetime_updated` - Дата редактирование сделки. Тип: `Date`. Модификатор доступа: `private`.
  
  ### Методы класса
  
  `static fromArray(array: any): Array<DealModel>` - Возвращает массив сделок в виде массива моделей.  
  `get id(): number` - Возвращает ID сделки.  
  `get employee(): EmployeeObject` - Возвращает автора сделки.  
  `get client(): ClientObject` - Возвращает клиента, к которому прикреплена сделка.  
  `get product(): ProductArray` - Возвращает массив продуктов данной сделки.  
  `get stage_id(): number` - Возвращает ID стадию, к которой относится данная сделка.  
  `get title(): string` - Возвращает наименование сделки.  
  `get description(): string` - Возвращает описание сделки.  
  `get status(): string` - Возвращает статус сделки.  
  `get total(): number` - Возвращает стоимость сделки.  
  `get datetime_created(): Date` - Возвращает дату создания сделки.  
  `get datetime_updated(): Date` - Возвращает дату редактирования сделки.  
  `set stage_id(id: number)` - Устанавливает стадию сделки.
  `get datetime_created_format(): string` - Возвращает дату создания сделки в строковом формате.  
  `get objectUpdate(): any` - Возвращает объект сделки в виде JSON.  
  `get statusLocale(): string` - Возвращает статус сделки в строковом формате.  
  
## Модель `ActivityModel`
  ### Поля модели
  `_id` - Уникальный идентификатор активности. Тип: `number`. Модификатор доступа: `private`.  
  `_employee` - Автор активности. Тип: `EmployeeObject`. Модификатор доступа: `private`.  
  `_client` - Клиент, к которому прикреплена активность. Тип: `ClientObject`. Модификатор доступа: `private`.  
  `_deal` - Сделка, к которой может быть прикреплена активность. Опционально. Тип: `DealObject`. Модификатор доступа: `private`.  
  `_type_title` - Заголовок типа активности. Тип: `string`. Модификатор доступа: `private`.  
  `_description` - Описание активности. Тип: `string`. Модификатор доступа: `private`.  
  `_document` - Ссылка на документ, которой прикреплен к активности. Опционально. Модификатор доступа: `private`.  
  `_datetime_created` - Дата создания активности. Тип: `Date`. Модификатор доступа: `private`.                  
  `__datetime_updated` - Дата редактирования активности. Тип: `Date`. Модификатор доступа: `private`.
  
  ### Методы класса
  
  `static fromArray(array: any): Array<ActivityModel>` - Возвращает массив активностей в виде массива моделей.  
  `set description(description: string)` - Устанавливает описание активности.  
  `set type_title(type_title: string)` - Устанавливает заголовок типа активности.  
  `get id(): number` - Возвращает ID активности.  
  `get employee(): EmployeeObject` - Возвращает автора активности.  
  `get client(): ClientObject` - Возвращает клиента, к которому привязана активность.  
  `get deal(): DealObject` - Возвращает сделку, к которой прикреплена активность или `null`.  
  `get type_title(): string` - Возвращает заголовок типа активности.  
  `get description(): string` - Возвращает описание активности.  
  `get document(): string` - Возвращает ссылку на файл.  
  `get datetime_created(): Date` - Возвращает дату создания активности.  
  `get datetime_updated(): Date` - Возвращает дату редактирования активности.  
  `get string_datetime_created(): any` - Возвращает дату создания активности в строковом виде.
  
## Модель `DealStageModel` 
  ### Поля модели
  `_id` - Уникальный идентификатор стадии сделки. Тип: `number`. Модификатор доступа: `private`.  
  `_title` - Заголовок стадии сделки. Тип: `string`. Модификатор доступа: `private`.  
  `_company` - Массив компаний, которые имеют доступ к данной стадии сделки. Тип: `CompanyArray`. Модификатор доступа: `private`.  
  
  ### Методы класса
  
  `get id():number` - Возвращает ID стадии сделки.  
  `get title():string` - Возвращает заголовок стадии сделки.                 
  `get company(): CompanyArray` - Возвращает массив компаний.  
  `static fromArray(array: any): Array<DealStageModel>` - Возвращает массив стадий сделок в виде массива моделей.  
  
## Модель `ActivityTypeModel`
  ### Поля модели
  `_id` - Уникальный идентификатор типа активности. Тип: `number`. Модификатор доступа: `private`.  
  `_company` - Массив компаний, которые имеют доступ к данному типу активности. Тип: `CompanyArray`. Модификатор доступа: `private`.  
  `_title` - Заголовок типа активности. Заголовок стадии сделки. Тип: `string`. Модификатор доступа: `private`.  
  
 

