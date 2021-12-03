
/**
 * DBシートに登録された情報を取得する
 * 
 * @return {Object} data DBシートの全データ
 */
function viewGraph() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB');

  //店名の列から取得する
  var ColValues = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues();
  var lastRow = ColValues.filter(String).length;

  var rowIndex = 2;
  var areaRow = 1;
  var colStartIndex = 1;
  var data = sheet.getSheetValues(rowIndex, colStartIndex, lastRow, 6);
  for(var i=0;i<data.length;i++){
     var timeList = Utilities.formatDate(data[i][0],'JST', 'yyyy/MM/dd HH:mm:ss');
    data[i][0] = timeList;
  }
  return data;
}

/**
 * 店舗マスタシートに登録された情報を取得する
 * 
 * @return {Object} data 店舗マスタの全データ
 */
function getShopMst() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('店名マスタ');

  //店名の列から取得する
  var ColValues = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues();
  var lastRow = ColValues.filter(String).length;

  var rowIndex = 2;
  var areaRow = 1;
  var colStartIndex = 1;
  var data = sheet.getSheetValues(rowIndex, colStartIndex, lastRow, 6);

  return data;
}