/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 * @see https://developers.google.com/apps-script/guides/triggers#onopene
 */
function onOpen(e) {
  const sheet = e.range.getSheet();
  //При запуске таблицы установить текущую дату
  sheet.getRange("H1").setValue(SalaryAutomatizationDataEntries.today());

  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Отчеты").addItem("Выгрузить общий отчет", "Report").addToUi();
}

function Report() {
  let htmlTemplate = HtmlService.createTemplateFromFile("Download.html");
  htmlTemplate.dataFromServerTemplate = { 
    url: getPDF().getDownloadUrl() 
  };

  let html = htmlTemplate.evaluate()
    .setWidth(200)
    .setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(html, "Download");
}

function getDValues(sheet, range, isDiscardRowByFirstEmpty=true) {
  var result = [];
  var dValues = sheet.getRange(range).getDisplayValues(); 
  if(isDiscardRowByFirstEmpty) {
      dValues.forEach(function(row, i) {
      var cellValue = row[0];
      if(cellValue != null && cellValue !== "") {
        result.push(row);
      } 
    });
  } else {
    result = dValues;
  }
  
  return result;
}

function getPDF() {
  const idt = SpreadsheetApp.getActive().getId();
  const token = ScriptApp.getOAuthToken();
  const baseUrl = `https://docs.google.com/spreadsheets/d/${idt}/embed/oimg?access_token=${token}&disposition=ATTACHMENT&bo=false&filetype=png&oid=`;
  const sheet = getSheet();
  const charts = sheet.getCharts();

  var tempDoc = DocumentApp.create("temp_dashboard");
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = "Calibri";
  style[DocumentApp.Attribute.FONT_SIZE] = 18;
  style[DocumentApp.Attribute.BOLD] = true;
  tempDoc.addHeader().setText(sheet.getRange("A2:E2").getDisplayValue()).setAttributes(style);

  var body = tempDoc.getBody();
  var table = body.appendTable(getDValues(sheet, "F3:J5"));

  table.setAttributes(getTableStyle());
  setTableHeaderStyle(table, Colors.GRAY);

  style = {};
  style[DocumentApp.Attribute.BOLD] = true;
  table.getRow(1).getCell(0).setBackgroundColor(Colors.YOLK).setAttributes(style);
  table.getRow(2).getCell(0).setBackgroundColor(Colors.GREEN).setAttributes(style);

  style = getCustomTableStyle(null, Colors.YOLK);
  setCellStyleAndHorizontalAlignment(table.getRow(1).getCell(1), style);
  setCellStyleAndHorizontalAlignment(table.getRow(1).getCell(2), style);

  style = getCustomTableStyle(null, Colors.GREEN);
  setCellStyleAndHorizontalAlignment(table.getRow(2).getCell(1), style);
  setCellStyleAndHorizontalAlignment(table.getRow(2).getCell(2), style);

  style = getCustomTableStyle(DocumentApp.VerticalAlignment.BOTTOM, Colors.GRAY_DARK);
  setCellStyleAndHorizontalAlignment(table.getRow(1).getCell(3), style);
  setCellStyleAndHorizontalAlignment(table.getRow(1).getCell(4), style);
  table.getRow(2).getCell(3).setAttributes(style);
  table.getRow(2).getCell(4).setAttributes(style);

  appendChart(body, baseUrl, charts[1]);
  appendChart(body, baseUrl, charts[0]);

  body.appendPageBreak();
  
  //Таблица толстого хвоста
  body.appendParagraph(sheet.getRange("A18:F18").getDisplayValue()).setAttributes(getHeading3Style());

  table = body.appendTable(getDValues(sheet, "A19:F100"));
  table.setAttributes( getTableStyle());
  setTableHeaderStyle(table, Colors.RED_DARK);
  setCellHorizontalAligment(table);

  //Таблица значений < 85 процентиля
  body.appendParagraph(`Задачи выполненые в рамках SLA <= ${sheet.getRange("H5").getDisplayValue()} д.`).setAttributes(getHeading3Style());
 
  table = body.appendTable(getDValues(sheet, "I19:N100"));
  table.setAttributes( getTableStyle());
  setTableHeaderStyle(table, Colors.GRAY);
  setCellHorizontalAligment(table);

  body.appendPageBreak();

  //Незавершенная работа
  body.appendParagraph("Незавершенная работа и текущий прогноз").setAttributes(getHeading3Style());
  appendChart(body, baseUrl, charts[3]);

  table = body.appendTable(getDValues(sheet, "Y19:AC100"));
  table.setAttributes( getTableStyle());
  setTableHeaderStyle(table, Colors.GRAY);
  setCellHorizontalAligment(table);

  body.appendPageBreak();

  //Пополнение Поставка WIP
  body.appendParagraph("Пополнение/Поставка/Незавершенная работа").setAttributes(getHeading3Style());
  appendChart(body, baseUrl, charts[2]);

  tempDoc.saveAndClose();
  
  docblob = DocumentApp.openById(tempDoc.getId()).getAs("application/pdf");
  docblob.setName("Dashboard_Report");
  DriveApp.getFileById(tempDoc.getId()).setTrashed(true);
  
  var files = DriveApp.getFilesByName("Dashboard_Report");
  while (files.hasNext()) {
    var file = files.next();
    file.setTrashed(true);
  } 
  var report = DriveApp.createFile(docblob);

  var resultUrl = report.getUrl();
  console.log(resultUrl);

  return report;
  // // 6. Return data as base64.
  // return {data: `data:${MimeType.PDF};base64,${Utilities.base64Encode(blob.getBytes())}`, filename: outputFilename};
}

function getHeading3Style() {
  const style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = "Calibri";
  style[DocumentApp.Attribute.FONT_SIZE] = 14;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.HEADING] = DocumentApp.ParagraphHeading.HEADING3; 
  return style;
}

function getCustomTableStyle(vAlignment, bg, fSize = 12) {
  const style = {};
  if(vAlignment != null) {
    style[DocumentApp.Attribute.VERTICAL_ALIGNMENT] = vAlignment;
  }
  
  style[DocumentApp.Attribute.FONT_SIZE] = fSize;
  style[DocumentApp.Attribute.BACKGROUND_COLOR] = bg;
  return style;
}

function getTableStyle() {
  const style = {};
  style[DocumentApp.Attribute.BORDER_WIDTH] = 0;
  style[DocumentApp.Attribute.FONT_FAMILY] = "Calibri";
  style[DocumentApp.Attribute.FONT_SIZE] = 8;
  return style;
}

function setCellStyleAndHorizontalAlignment(cell, style, alignment = DocumentApp.HorizontalAlignment.CENTER) {
  cell.setAttributes(style).getChild(0).asParagraph().setAlignment(alignment);
}

function setCellHorizontalAligment(table, alignment = DocumentApp.HorizontalAlignment.CENTER) {
  for(r=0; r<table.getNumRows(); r++) {
    const row = table.getRow(r);
    for(i=0; i<row.getNumCells(); i++) {
      row.getCell(i).getChild(0).asParagraph().setAlignment(alignment);
    }
  }
}

function setTableHeaderStyle(table, color) {
  const style = {};
  style[DocumentApp.Attribute.VERTICAL_ALIGNMENT] = DocumentApp.VerticalAlignment.BOTTOM;
  style[DocumentApp.Attribute.BACKGROUND_COLOR] = color;
  style[DocumentApp.Attribute.BOLD] = true;

  const row = table.getRow(0);
  for(i=0; i<row.getNumCells(); i++) {
    row.getCell(i).setAttributes(style).getChild(0).asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  }
}

function appendChart(body, url, chart, height = 600) {
  const img = body.appendImage(UrlFetchApp.fetch(url + chart.getChartId()).getBlob());
  const k = img.getWidth() / img.getHeight();
  img.setWidth(height).setHeight(height/k);
}

function getSheet() {
  return SpreadsheetApp.getActive().getSheetByName("Dashboard"); 
}

var Colors = {
  GRAY: "#CCCCCC",
  GRAY_DARK: "#7F7F7F",
  RED_DARK: "#CC0000",
  YOLK: "#FBBC04",
  GREEN: "#34AF53"
}

