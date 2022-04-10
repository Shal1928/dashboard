/**
 * Enum for tri-state values.
 * @readonly
 * @enum {number}
 */

var Knowledges = {
    System_Lead_Time : "System Lead Time",
    Cycle_Time : "Cycle Time",
    План_БА : "План БА",
    Написание_БТ : "Написание БТ",
    БТ_готово_План_СА : "БТ готово/План СА",
    Ознакомление_с_БТ : "Ознакомление с БТ",
    Написание_ТЗ : "Написание ТЗ",
    ТЗ_ГОТОВО : "Т З     Г О Т О В О",
    Оценка_Декомпозиция : "Оценка / Декомпозиция",
    План_разработки : "План разработки",
    РАЗРАБОТКА : "Р А З Р А Б О Т К А",
    ОиД_BACKEND : "ОиД BACKEND",
    ОиД_FRONTEND : "ОиД FRONTEND",
    ОиД_TEST : "ОиД TEST",
    План_BACKEND : "План BACKEND",
    План_FRONTEND : "План FRONTEND",
    План_Смежников : "План Смежников",
    Разработка_BACKEND : "Разработка BACKEND",
    Разработка_FRONTEND : "Разработка FRONTEND",
    Разработка_Смежников : "Разработка Смежников",
    План_DevOps : "План DevOps",
    Реализация_DevOp : "Реализация DevOps",
    Разработка_завершена : "Разработка завершена",
    План_Тестирования : "План Тестирования",
    Тестирование : "Тестирование",
    Протестировано : "Протестировано",
    БЛОКИРОВКА : "Б Л О К И Р О В К А",
    Готово : "Готово",
    РЕЛИЗ : "Р Е Л И З"
};

var WorkTypes = {
  Бизнес_задача : "Бизнес-задача",
  Проектная_задача: "Проектная задача",
  Техдолг : "Техдолг",
  Complex_Bug : "Complex-Bug",
  Backend_Feature : "Backend Feature",
  Backend_Bug : "Backend Bug",
  Web_Feature : "Web Feature",
  Web_Bug : "Web Bug",
  Подзадача_Backend : "Подзадача Backend",
  Подзадача_Frontend : "Подзадача Frontend",
  Подзадача_аналитика : "Подзадача аналитика",
  Подзадача_тестирования : "Подзадача тестирования",
  Подзадача_смежников : "Подзадача смежников",
  Инфр_проблема : "Инфр. проблема",
  Business_analysis : "Business analysis",
  Regress : "Regress"
}

var Sheets = {
  Table: "Table"
}

var Ranges = {
  NonExistentRow: -1,
  InputRow: 1,
  FirstDataRow: 3,
  FirstDataCol: 1,
  DataColCount: 10
}

var Columns = {
  UID : "A",
  Title : "B",
  PID : "C",
  ClassOfService : "D",
  Knowledge : "E",
  Type : "F",
  G : "G",
  IsPlan : "H",
  IsNew : "I",
  CommitmentPoint : "J",
  DeliveryPoint : "K",
  LT_AGE : "L",
  Handler : "M",
  ReleasePlan : "N",
  CountInCFD : "O",
  ExcludeFromSprint : "P",

  UID_NUM : 0,
  Title_NUM : 1,
  PID_NUM : 2,
  ClassOfService_NUM : 3,
  Knowledge_NUM : 4,
  Type_NUM : 5,
  G_NUM : 6,
  Epic_NUM : 7,
  IsNew_NUM : 8,
  CommitmentPoint_NUM : 9,
  DeliveryPoint_NUM : 10,
  LT_AGE_NUM : 11,
  Handler_NUM : 12,
  ReleasePlan_NUM : 13,
  CountInCFD_NUM : 14,
  ExcludeFromSprint_NUM : 15,

  FIRST : "A",
  LAST : "P"
}

var Handlers = {
  SERVICE : "СЕРВИС",
  BUFFER : "БУФЕР",
  BA : "БА",
  SA : "СА",
  DEVELOPERS : "РАЗРАБОТКА",
  Frontend : "",
  Backend : "",
  Tester : "",
  DEVOPS : "DEVOPS",
  INTEGRATIONS : "ОБЩИЙ СЕРВИС"
}

var WorkItemLevel = {
  RWI : "RWI",
  subtask : "subtask"
}
