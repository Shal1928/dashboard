class EntryDAO2 {
  constructor(sheetName, firstDataRow) {
    this.sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    this.firstDataRow = firstDataRow;
    this.lastDataRow = -1;

    this.Create=function(uid) {
      var entry = new Entry(null, null, null, null, null, null, null, null, null, null, null);
      if(uid == null || uid == "") {
        entry.uid = Utilities.getUuid();
      }


  
      // //Commitment Point
      // spreadsheet.getRange(Columns.CommitmentPoint + entry.row).setValue(date).setNumberFormat("dd.MM.YY");
      
      // //New Knowledge starting by service entry System Lead Time
      // duplicateBottomCellToColRow(spreadsheet, Columns.Knowledge, entry.row, isBefore).setValue(defaultKnowledge);

      // //Type set default Бизнес-задача
      // duplicateBottomCellToColRow(spreadsheet, Columns.Type, entry.row, isBefore).setValue(defaultType);

      // //IsNew
      // duplicateBottomCellToColRow(spreadsheet, Columns.IsNew, entry.row, isBefore);
      
      // //LT/Age
      // duplicateBottomCellToColRow(spreadsheet, Columns.LT_AGE, entry.row, isBefore);
      
      // //Handler
      // duplicateBottomCellToColRow(spreadsheet, Columns.Handler, entry.row, isBefore);
    };

    this.Read=function(rowNum) {
      var row = this.sheet.getRange(Columns.FIRST + rowNum + ":" + Columns.LAST + rowNum);    
      
      var entry = new Entry(
        rowNum, 
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
      
      entry.uid = row.getValues()[0][Columns.UID_NUM];     

      if(entry.uid !== "") {
        entry.title = row.getValues()[0][Columns.Title_NUM];
        entry.pid = row.getValues()[0][Columns.PID_NUM];
        entry.cos = row.getValues()[0][Columns.ClassOfService_NUM];
        entry.knowledge = row.getValues()[0][Columns.Knowledge_NUM];
        entry.type = row.getValues()[0][Columns.Type_NUM];
        entry.epic = row.getValues()[0][Columns.Epic_NUM];
        entry.isAfterSprintStart = row.getValues()[0][Columns.IsNew_NUM];
        entry.commitmentPoint = row.getValues()[0][Columns.CommitmentPoint_NUM];
        entry.deliveryPoint = row.getValues()[0][Columns.DeliveryPoint_NUM];
        entry.handler = row.getValues()[0][Columns.Handler_NUM];
      }
      
      console.log("EntryDAO.Read(" + rowNum + "):" + entry);
      return entry;
    }

    this.ReadAll=function() {
      var dataRange = this.sheet.getRange(Columns.FIRST + firstDataRow + ":" + Columns.LAST);  
      const numRows = dataRange.getNumRows();
      
      var entries = {};

      for (let i = this.firstDataRow; i <= numRows; i++) {
        let entry = this.Read(i);
        if (entry.uid === "") break;

        entries[entry.uid] = entry;
      }

      return entries;
    }
  }  
}

// const numRows = range.getNumRows();
//   const numCols = range.getNumColumns();

//   for (let i = 1; i <= numCols; i++) {
//     for (let j = 1; j <= numRows; j++) {
//       const cell = range.getCell(j, i)

//       f(cell)
//     }
//   }

// function getFirstEmptyRowByColumnArray(sheet, letter, row) {
//   // var spr = SpreadsheetApp.getActive().getSheetByName("Settings")
//   var column = sheet.getRange(letter + row + ":" + letter);
//   var values = column.getValues();
//   var ct = 0;
//   while ( values[ct] && values[ct][0] != "" ) {
//     ct++;
//   }
  
//   return ct + 1;
// }
