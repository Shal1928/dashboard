function rangeAsImage(range) {
  const [header, ...values] = range.getDisplayValues();
  const table = Charts.newDataTable();
  header.forEach(e => table.addColumn(Charts.ColumnType.STRING, e));
  values.forEach(e => table.addRow(e));
  
  return Charts.newTableChart().setDataTable(table.build()).setDimensions(500, 500).setOption("alternatingRowStyle", false).build().getBlob();
}
