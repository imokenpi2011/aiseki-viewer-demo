/**
 * シートに登録された情報を取得する
 * 
 * @return {Object} data 人数データシートのデータ
 */
function getShopList() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('人数データ');

  //店名の列から取得する
  var ColValues = sheet.getRange(3, 3, sheet.getLastRow(), 1).getValues();
  var lastRow = ColValues.filter(String).length;

  var rowIndex = 3;
  var areaRow = 1;
  var colStartIndex = 1;
  var data = sheet.getSheetValues(rowIndex, colStartIndex, lastRow, 8);
  
  return data;
}

/**
 * 最終更新時刻を取得。
 * 
 * @return {string}} updateTime 最終更新日時の文字列
 */
function getUpdateTime(){
  var sheet = SpreadsheetApp.getActiveSheet();

  //最終更新日時を取得
  var updateTime =sheet.getRange("A1").getValue();

  return updateTime;
}