//row, uid, title, cos, knowledge, type, commitmentPoint, deliveryPoint
class EntryDAO {
  constructor(sheetName, firstEntryCol, firstEntryRow, lastEntryCol) {
    this.sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    this.firstEntryCol = firstEntryCol;
    this.firstEntryRow = firstEntryRow;
    this.lastEntryCol = lastEntryCol;
    this.entries = this.ReadAll();
    this.nextRow = null;

    this.GetSheet=function() {
      return this.sheet;
    }

    this.GetNextRow=function() {
      return this.nextRow;
    }

    this.Create=function(uid) {
      if(uid == null || uid == "") {
        uid = Utilities.getUuid();
      }

      if(this.Get(uid) != null) {
        return null;
      }

      var entry = new Entry(this.nextRow, uid, null, null, null, null, null, null);

      return entry;
    };

    this.Fetch=function(uid) {
      this.entries = this.ReadAll();

      return this.Get(uid);    
    }

    this.Get=function(uid) {
      for (let i = 0; i <= this.entries.length; i++) {
    
        let entry = this.entries[i];
        if (entry.uid === "") {
          break;
        }

        if (entry.uid === uid) {
          return entry;
        }
      }

      return null;
    }

    this.GetAll=function() {
      return this.entries;
    }

    this.Read=function(rowNum) {
      var range = this.sheet.getRange(this.firstEntryCol + rowNum + ":" + this.lastEntryCol + rowNum);    
      
      var entry = new Entry(
        rowNum, 
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
      
      entry.uid = range.getValues()[0][Columns.UID_NUM];     

      if(entry.uid !== "") {
        entry.title = range.getValues()[0][Columns.Title_NUM];
        entry.cos = range.getValues()[0][Columns.ClassOfService_NUM];
        entry.knowledge = range.getValues()[0][Columns.Knowledge_NUM];
        entry.type = range.getValues()[0][Columns.Type_NUM];
        entry.commitmentPoint = range.getValues()[0][Columns.CommitmentPoint_NUM];
        entry.deliveryPoint = range.getValues()[0][Columns.DeliveryPoint_NUM];
      }
      
      console.log("EntryDAO.Read(" + rowNum + "):" + entry);
      return entry;
    }

    this.ReadAll=function() {
      var range = this.sheet.getRange(this.firstEntryCol + firstDataRow + ":" + this.lastEntryCol );  
      const numRows = range.getNumRows();
      
      var entries = {};

      for (let i = this.firstDataRow; i <= numRows; i++) {
        let entry = this.Read(i);
        if (entry.uid === "") {
          this.nextRow = i;
          break;
        }
        entries[entry.uid] = entry;
      }

      return entries;
    }

    this.Write=function(entry) {
      var range = this.sheet.getRange(this.firstEntryCol + entry.row + ":" + this.lastEntryCol + entry.row);    
      range.setValues([
        [
          entry.uid, entry.title, null, entry.cos, entry.knowledge, entry.type, null, null, entry.commitmentPoint, entry.deliveryPoint 
        ]
      ])

      if(entry.row == this.nextRow) {
        this.nextRow++;
      }
    }

    // this.WriteAll=function(entries) {
    //   //foreach entries
    //   // var range = this.sheet.getRange(this.firstEntryCol + entry.row + ":" + this.lastEntryCol + entry.row);    
    //   // range.setValues([
    //   //   [
    //   //     entry.uid, entry.title, null, entry.cos, entry.knowledge, entry.type, null, null, entry.commitmentPoint, entry.deliveryPoint 
    //   //   ]
    //   // ])
    // }
  }  
}
