/**
 * doGetメソッド.
 * 
 * @param {Object} e パラメータ
 */
function doGet(e){
  var page=e.parameter["page"];
  var app;
  //pageのパラメータがnullかnumberなら現在人数、transitionなら人数推移のページを表示
  if(page == "number" || page==null){
    app = HtmlService.createHtmlOutputFromFile("viewNumber").setTitle('相席屋グラフ');
  }else if(page =="transition"){
    app = HtmlService.createHtmlOutputFromFile("viewTransition").setTitle('相席屋人数推移');
  }
  return app.addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e){
}

/**
 * 遷移用に現在ページのURLを取得する
 * 
 * @param {string} url 現在ページのURL
*/
function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}