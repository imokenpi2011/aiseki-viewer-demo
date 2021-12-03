// @ts-nocheck
/**
 * 相席屋の情報を取得する。
 * 
 * @return {Object} list_arr 配列形式の店舗情報
 */
function getAisekiya() {
  //スクレイピングしたいWebページのURLを変数で定義する
  let url = "https://aiseki-ya.com/";
  //URLに対しフェッチを行ってHTMLデータを取得する
  let html = UrlFetchApp.fetch(url).getContentText("UTF-8");
  //Parserライブラリを使用して条件を満たしたHTML要素を抽出する
  let shopList = Parser.data(html)
  .from("<div class=\"shopname\">")
  .to("<div class=\"shop_link_btn\">").iterate();

  //配列の宣言
  var list_arr = [];
  //値抽出処理
  for(var i =0; i<shopList.length; i++){
    //店舗名の抽出(空白やばいのでreplaceで取り除いてます)
    var shopName = "相席屋"+Parser.data(shopList[i])
    .from("<p>").to("</p>")
    .build().replace(/\s+/g, "");
  
    //男性数の抽出
    var menNum = Parser.data(shopList[i])
    .from("cong_man\">\n\t\t\t<span>").to("</span>").build();
  
    //女性数の抽出
    var womenNum = Parser.data(shopList[i])
    .from("cong_woman\">\n\t\t\t<span>").to("</span>").build();
  
    //空文字や不正文字が含まれていなければ配列に要素を追加
    if (isInvalidData(shopName,menNum,womenNum)){
      list_arr.push([shopName,menNum,womenNum])
    } else {
      console.error("invalid data at:[",shopName,menNum,womenNum,"]")
    }
  }
  return list_arr;
}

/**
 * ORIENTAL LOUNGEの情報を取得する。
 * 
 * @return {Object} list_arr 配列形式の店舗情報
 */
function getOrientalLounge() {
  //スクレイピングしたいWebページのURLを変数で定義する
  let url = "https://oriental-lounge.com/";
  //URLに対しフェッチを行ってHTMLデータを取得する
  let html = UrlFetchApp.fetch(url).getContentText("UTF-8");
  //Parserライブラリを使用して条件を満たしたHTML要素を抽出する
  let shopList = Parser.data(html)
  .from("div class=\"shop_block\">\r\n        ")
  .to("<div class=\"text\">").iterate();

  //配列の宣言
  var list_arr = [];
  //値抽出処理
  for(var i =0; i<shopList.length; i++){

    //店舗名の抽出(空白やばいのでreplaceで取り除いてます)
    var shopName = "ORIENTAL LOUNGE"+Parser.data(shopList[i])
    .from("shop_name\">\r\n").to("<br>")
    .build().replace(/\s+/g, "");
  
    //渋谷本店の場合は名前の最後に「店」をつけない
    if(shopName != 'ORIENTAL LOUNGE渋谷本店'){
      shopName = shopName + "店";
    }
  
    //男性数の抽出
    var menNum = Parser.data(shopList[i])
    .from("class=\"man\"><span>").to("</span>").build();
  
    //女性数の抽出
    var womenNum = Parser.data(shopList[i])
    .from("class=\"woman\"><span>").to("</span>").build();
  
    //空文字や不正文字が含まれていなければ配列に要素を追加
    if (isInvalidData(shopName,menNum,womenNum)){
      list_arr.push([shopName,menNum,womenNum])
    } else {
      console.error("invalid data at:[",shopName,menNum,womenNum,"]")
    }
  }
  return list_arr;
}

/**
 * JISの情報を取得する。
 * 
 * @return {Object} list_arr 配列形式の店舗情報
 */
function getJis() {
  //スクレイピングしたいWebページのURLを変数で定義する
  let url = "https://jis.bar/";
  //URLに対しフェッチを行ってHTMLデータを取得する
  let html = UrlFetchApp.fetch(url).getContentText("UTF-8");
  //Parserライブラリを使用して条件を満たしたHTML要素を抽出する
  const shopList = JSON.parse(Parser.data(html)
  .from("var datas = ")
  .to(";\n    // console.log(datas);")
  .build());

  //店舗名、人数を格納した配列を作成
  var shopNameList = Object.keys(shopList);
  var numberList = Object.values(shopList);

  //配列の宣言
  var list_arr = [];

  //値抽出処理
  for(var i=0; i<shopNameList.length; i++){
    if(numberList[i]){
      //店舗名の抽出
      var shopName = "JIS "+ shopNameList[i] + "店";
    
      //男性数の抽出
      var menNum=numberList[i].shared.mens_customer_num;
    
      //女性数の抽出
      var womenNum=numberList[i].shared.ladys_customer_num;
      
      //空文字や不正文字が含まれていなければ配列に要素を追加
      if (isInvalidData(shopName,menNum,womenNum)){
        list_arr.push([shopName,menNum,womenNum])
      } else {
        console.error("invalid data at:[",shopName,menNum,womenNum,"]")
      }
    }
  }
  return list_arr;
}

/**
 * VIVOの情報を取得する。
 * 
 * @return {Object} list_arr 配列形式の店舗情報
 */
function getVivo(){
  //スクレイピングしたいWebページのURLを変数で定義する
  let url = "https://line.saucer-aiseki.com/shop_info.json?shop_id=1";
  //URLに対しフェッチを行ってHTMLデータを取得する
  let html = UrlFetchApp.fetch(url).getContentText("UTF-8");
  //Parserライブラリを使用して条件を満たしたHTML要素を抽出する
  const shopList = JSON.parse(html);

  //店舗名、人数を格納した配列を作成

  //配列の宣言
  var list_arr = [];
  //値抽出処理
  //店舗名の抽出
  var shopName = "VIVO渋谷店";

  //男性数の抽出
  var menNum=shopList.data.male;

  //女性数の抽出
  var womenNum=shopList.data.female;
  
  //配列に要素を追加
  list_arr.push([shopName,menNum,womenNum])
  
  return list_arr;
}