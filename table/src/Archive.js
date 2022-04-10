function Report() {
  const outputFilename = "sample.pdf";

  // 1. Retrieve all charts in a Google Spreadsheet.
  const charts = SpreadsheetApp.getActiveSpreadsheet().getSheets().flatMap(s => s.getCharts());

  // 2. Create new Google Slides as a temporal file.
  const s = SlidesApp.create("temp");

  // 3. Put the charts to each slide.
  let slide = s.getSlides()[0];
  slide.getShapes().forEach(e => e.remove());
  charts.forEach((c, i, a) => {
    slide.insertSheetsChart(c).alignOnPage(SlidesApp.AlignmentPosition.CENTER);
    if (i < a.length - 1) slide = s.appendSlide();
  });
  s.saveAndClose();

  // 4. Output Google Slides as a PDF data.
  const file = DriveApp.getFileById(s.getId());
  DriveApp.createFile(file.getBlob().setName(outputFilename));
  
  // 5. Remove the temporal file of Google Slides.
  file.setTrashed(true);
}

class CycleEntry {
  constructor() {
    //id в title
  }
}

function copyUserValueToTargetRow(sheet, col, targetRow) {
  sheet.getRange(col + 1).copyTo(sheet.getRange(col + targetRow), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);  
}


// var stop = Error();
  // var result = -1;
  // try{
  //   idRange.getValues().flat().forEach(function(value, row){
  //     if(value === targetId) {
  //       result = start + row;
  //       Browser.msgBox("=" + result);
  //       throw stop;
  //     }

  //     if (value === "") {
  //       result =  -1;
  //       Browser.msgBox("=" + result);
  //       throw stop;
  //     }
  //   });
  // }catch (ex) {
  //   Browser.msgBox("");
  //   if (ex !== stop) {
  //     throw ex;
  //   }
  // }

  // return result;

class RWI {
  constructor(uid, title, cos, type, epic, commitmentPoint, deliveryPoint, handler) {
    this.row = row;
    this.uid = uid;
    this.title = title;
    this.pid = pid; 
    this.cos = cos; 
    this.knowledge = knowledge;
    this.type = type;
    this.epic = epic; 
    this.commitmentPoint = commitmentPoint;
    this.deliveryPoint = deliveryPoint; 
    this.handler = handler;
    this._isChanged = false;

    this.Changed = function() {
      this._isChanged = true;
    }
  }
}

function TEST() {
  var entryDAO = new EntryDAO2("Table_Draft", 3);
  var entries = entryDAO.ReadAll();
  console.log(entries);
}

function myFunction() {
  var activeRow = spreadsheet.getCurrentCell().getRow();
  var uid = Browser.inputBox("ActiveRow=" + activeRow + " | UID : ", Browser.Buttons.OK_CANCEL);
}

function add_new_entry(spreadsheet, currentRow, isBefore, uid, date, defaultKnowledge, defaultType) {

  //Insert New Row around currentRow position
  if(isBefore){
    spreadsheet.insertRowsBefore(currentRow, 1);
  }else{
    spreadsheet.insertRowsAfter(currentRow, 1);
    currentRow++;
  }

  console.log((isBefore ? "Before currentRow: " : "After currentRow: ") + currentRow)

  //UID Generate or uid
  spreadsheet.getRange(Columns.UID + currentRow).setValue(uid == "" ? Utilities.getUuid() : uid);
  
  //Commitment Point
  spreadsheet.getRange(Columns.CommitmentPoint + currentRow).setValue(date).setNumberFormat('dd.MM.YY');
  
  //New Knowledge starting by service entry System Lead Time
  duplicateBottomCellToColRow(spreadsheet, Columns.Knowledge, currentRow, isBefore).setValue(defaultKnowledge);

  //Type set default Бизнес-задача
  duplicateBottomCellToColRow(spreadsheet, Columns.Type, currentRow, isBefore).setValue(defaultType);

  //IsNew
  duplicateBottomCellToColRow(spreadsheet, Columns.IsNew, currentRow, isBefore);
  
  //LT/Age
   duplicateBottomCellToColRow(spreadsheet, Columns.LT_AGE, currentRow, isBefore);
  
  //Handler
   duplicateBottomCellToColRow(spreadsheet, Columns.Handler, currentRow, isBefore);
}

function rowToDict(sheet, rownumber) {
  var columns = sheet.getRange(1,1,1, sheet.getMaxColumns()).getValues()[0];
  var data = sheet.getDataRange().getValues()[rownumber-1];
  var dict_data = {};
  for (var keys in columns) {
    var key = columns[keys];
    dict_data[key] = data[keys];
  }
  return dict_data;
}

function duplicateBottomCellToColRow(spreadsheet, col, row, isBefore) {
  var fromCell = spreadsheet.getRange(col + (isBefore ? row + 1 : row - 1));
  var toCell = spreadsheet.getRange(col + row);
  fromCell.copyTo(toCell, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false); 
  return toCell;
}

// class AdvancedLogger {
//   constructor() {

//     this.Log(log) {
//       var parameters = {
//     isValid: true,
//     content: 'some string',
//     timestamp: new Date()
//   };
//   console.log(parameters);
//     }
//   }
// }

function colToDict(sheet, firstCell) {
  var data = sheet.getDataRange().getValues()[getFirstEmptyRowByColumnArray(sheet, firstCell[0], firstCell[1])];
  var dic = {};
  for (var keys in columns) {
    var key = columns[keys];
    dic[key] = data[keys];
  }
  return dic;
}