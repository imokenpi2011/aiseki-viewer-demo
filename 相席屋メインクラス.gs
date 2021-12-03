/**
 * メイン実行メソッド。
 */
function main(){
  var list_arr = getOrientalLounge()
  .concat(getJis())
  .concat(getVivo())
  .concat(getAisekiya());
  writeSheet(list_arr);
}

/**
 * 渡された情報をスプレッドシートに書き込む。
 * 
 * @param {object} list_arr 全相席屋の現在人数データの一覧
 */
function writeSheet(list_arr) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('人数データ');
  //取得時刻を書き込む
  sheet.getRange("A1").setValue(getCurTime());

  //人数比を書き込む
  sheet.getRange(3, 3, 100, list_arr[0].length).setValue("");
  sheet.getRange(3, 3, list_arr.length, list_arr[0].length).setValues(list_arr);
}

/**
 * 現在時刻を取得する。
 * 
 * @return {string} dataStr [yyyy年MM月dd日(曜日) HH時mm分]形式の文字列
 */
function getCurTime(){
  var date = new Date();
  var dayOfWeek = [ "日", "月", "火", "水", "木", "金", "土"][date.getDay()];

  var dateStr = Utilities.formatDate( date, 'Asia/Tokyo', '最終更新：yyyy年MM月dd日('+dayOfWeek+') HH時mm分')
  return dateStr;
}

/**
 * 正常なデータかどうか判断する
 * 
 * @return boolean 判定結果
 */
var isInvalidData = function(){
  // 引数がない場合はエラー
  if (arguments.length == 0) { return false;}

  // 不正な文字列があればエラー
  for(var i = 0; i < arguments.length; ++i){
    console.log(arguments[i])
    if (!arguments[i]){
      return false;
    }
  }
  return true;
}