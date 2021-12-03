/**
 * 定期実行を設定する
 * 参考：https://www.mechmathmass.tokyo/entry/gas-trigger
 */
function startTriggers(){
  setTriggerofTrigger();
  setTriggerofDeleteTrigger();
}

/**
 * 現在人数取得用のトリガーを設定する(基本使用しない)
 */
function setTriggerofTrigger(){
  // 人数取得
  ScriptApp.newTrigger("setGetNumTrigger")
  .timeBased()
  .atHour(17)
  .everyDays(1) // Frequency is required if you are using atHour() or nearMinute()
  .create();

  // DB登録
  ScriptApp.newTrigger("setRegistDbTrigger")
  .timeBased()
  .atHour(17)
  .everyDays(1) // Frequency is required if you are using atHour() or nearMinute()
  .create();
}

/**
 * DB登録用のトリガーを設定する(基本使用しない)
 */
function setTriggerofDeleteTrigger(){
  // 人数取得
  ScriptApp.newTrigger("deleteGetNumTrigger")
  .timeBased()
  .atHour(5)
  .everyDays(1) // Frequency is required if you are using atHour() or nearMinute()
  .create();

  // DB登録
  ScriptApp.newTrigger("deleteRegistDbTrigger")
  .timeBased()
  .atHour(5)
  .everyDays(1) // Frequency is required if you are using atHour() or nearMinute()
  .create();
}

/**
 * 人数取得用のトリガーを削除する
 */
function deleteGetNumTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "main") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/**
 * 人数取得用のトリガーを設定する
 */
function setGetNumTrigger() {
  ScriptApp.newTrigger("main")
  .timeBased()
  .everyMinutes(5)
  .create();
}

/**
 * DB登録用のトリガーを削除する
 */
function deleteRegistDbTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "registDb") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/**
 * DB登録用のトリガーを設定する
 */
function setRegistDbTrigger() {
  ScriptApp.newTrigger("registDb")
  .timeBased()
  .everyMinutes(30)
  .create();
}


