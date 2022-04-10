class Entry {
  constructor(row, uid, title, /*pid,*/ cos, knowledge, type, /*epic,*/ commitmentPoint, deliveryPoint/*, handler*/) {
    this.row = row;
    this.uid = uid;
    this.title = title;
    //this.pid = pid; 
    this.cos = cos; 
    this.knowledge = knowledge;
    this.type = type;
    //this.epic = epic; 
    this.commitmentPoint = commitmentPoint;
    this.deliveryPoint = deliveryPoint; 
    //this.handler = handler;
    this._isChanged = false;

    this.Changed = function() {
      this._isChanged = true;
    }
  }
}
