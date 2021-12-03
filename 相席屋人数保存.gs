/**
 * DBへ登録用のデータを生成する
 */
function registDb() {
  var shopList = getShopList();
  var curDateTime = getDateTimeStr(); 
  var registDataList = [];

  for(var i=0; i<shopList.length;i++){
    var registData = [curDateTime, shopList[i][5], shopList[i][6], shopList[i][7], shopList[i][3], shopList[i][4]];

    // 値が含まれるデータのみ登録する
    if(isInvalidData(curDateTime, shopList[i][5], shopList[i][6], shopList[i][7], shopList[i][3], shopList[i][4])){
      registDataList.push(registData);
    } else {
      console.error("[DB REGIST]invalid data at:",registData)
    }
  }
  writeDbSheet(registDataList);
}

/**
 * DBシートへの書き込みを行う
 */
function writeDbSheet(list_arr){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB');
  var ColValues = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues();
  var startRow = ColValues.filter(String).length +2;
  sheet.getRange(startRow, 1, list_arr.length, list_arr[0].length).setValues(list_arr);
}

/**
 * DB登録用に現在の日時を取得する
 */
function getDateTimeStr(){
  var date = new Date();
  var curDateTime = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm');
  return curDateTime;
}