/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 * @see https://developers.google.com/apps-script/guides/triggers#onopene
 */
function onOpen(e) {
  const sheet = e.range.getSheet();
  //При запуске таблицы установить текущую дату
  const t = today();
  setUserValue(sheet, Columns.CommitmentPoint, t);
  setUserValue(sheet, Columns.DeliveryPoint, t);
}

/**
 * The event handler triggered when the selection changes in the spreadsheet.
 * @param {Event} e The onSelectionChange event.
 * @see https://developers.google.com/apps-script/guides/triggers#onselectionchangee
 */
function onSelectionChange(e) {
  const range = e.range;
  const sheet = range.getSheet();
  const row = range.getRow();

  if(row >= Ranges.FirstDataRow) {
    setUserValue(sheet, Columns.UID, sheet.getRange(Columns.UID + row).getValue());
  }
}

/**
 * Завершить выполнение задачи, проставив дату поставки
 */
function Finish() {
  var sheet = getSheet();
  var targetId = getUserValue(sheet, Columns.UID);
  var targetRow = getRowById(sheet, Columns.UID, getLastRow(sheet), targetId);

  if(targetRow == Ranges.NonExistentRow) {
    Browser.msgBox("Запись с идентификатором: " + targetId + " не найдена в колонке: " + Columns.UID + " !");
  } else {
    sheet.getRange(Columns.DeliveryPoint + targetRow).setValue(getUserValue(sheet, Columns.DeliveryPoint));
  }
}

/**
 * Начать выполнение задачи, проставив дату принятия обязательств
 */
function Start() {
  const sheet = getSheet();

  const newId = getUserValue(sheet, Columns.UID);
  const lastRow = getLastRow(sheet);
  const isNew = getRowById(sheet, Columns.UID, lastRow, newId);

  if(isNew == Ranges.NonExistentRow) {
    const newRow = lastRow + 1;
    sheet.getRange(newRow, Ranges.FirstDataCol, 1, Ranges.DataColCount).setValues(sheet.getRange(Ranges.InputRow, Ranges.FirstDataCol, 1, Ranges.DataColCount).getValues());
    setUserValue(sheet, Columns.Title, null);
  } else {
    Browser.msgBox("Идентификатор: " + newId + " уже существует в ячейке: " + Columns.UID + isNew + " !");
  }
};

function getLastRow(sheet) {
  return sheet.getRange("A1").getDataRegion(SpreadsheetApp.Dimension.ROWS).getLastRow();
}

function getRowById(sheet, col, lastRow, targetId) { 
  for (let i = Ranges.FirstDataRow; i <= lastRow; i++) {
    if (sheet.getRange(col + i).getValue() === targetId) {
      return i;
    }
  }

  return Ranges.NonExistentRow;
}

function getSheet() {
  return SpreadsheetApp.getActive().getSheetByName(Sheets.Table); 
}

function getUserValue(sheet, col) {
  return sheet.getRange(col + Ranges.InputRow).getValue();
}

function setUserValue(sheet, col, value) {
  sheet.getRange(col + Ranges.InputRow).setValue(value);
}

function today() {
  return Utilities.formatDate(new Date(), SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "dd.MM.YYYY");
}
