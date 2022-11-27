function doPost(e){
  var estringa = JSON.parse(e.postData.contents);
  var d = new Date();
  var SpreadSheet = SpreadsheetApp.openById("1D0zJv8yFJn-PjEfLDnEOTU8n8S5aQm7EiGZ55k9rRyE");
  var Sheet = SpreadSheet.getSheetByName("紀錄收到的訊息");
  var LastRow = Sheet.getLastRow();
  Sheet.getRange(LastRow+1, 1).setValue(d);  
  Sheet.getRange(LastRow+1, 2).setValue(estringa);
  identificar(estringa);
}

function timer(){
    var d = new Date();
    var min = d.getMinutes();
    var hour = d.getHours();
    var date = d.getDate();
    var month = d.getMonth();
    var day = d.getDay();
    var response = UrlFetchApp.fetch('https://www.bandbbs.cn/whats-new/latest-activity');
    var $ = Cheerio.load(response.getContentText());
    var title = $('div.contentRow-title').first().text();
    var content = $('div.contentRow-snippet').first().text();
    var time = $('div.contentRow-minor').first().text();
    var threadlink = $('div.contentRow-title > a').first().attr('href');
    var url = "https://www.bandbbs.cn"+threadlink;
  if(min==0)
  {
    var payload = {
      "method": "sendMessage",
      "chat_id": String(-1.001413646032E12),
      "text": "整點報時功能暫時停用.",
      "parse_mode":"Markdown",
      "disable_notification":true,
      "disable_web_page_preview":true,
    }
    start(payload);
  }
  /*String(-1.001413646032E12)*/
  /*"整點報時--現在時間:\*"+month+"月"+date+"號("+day+") "+hour+":"+min+"0"+":00"+"*\n\n最新動態(_"+time+"_):\*"+title+"*"+content+"\n[(查看完整內容)]("+url+")",*/
}

/*function restrict (){
  var ChatPermissions = {
      'can_send_messages':false,
      'can_send_media_messages':false,
      "can_send_other_messages":false,
      "can_add_web_page_previews":false,
      "can_send_polls":false,
      "can_change_info":false,
      "can_invite_users":false,
      "can_pin_messages":false
    }
      var restrict = {
        "chat_id": 1001365615879,
        "user_id": 950729481,
        "permissions":ChatPermissions
      }
      var returneds = UrlFetchApp.fetch("https://api.telegram.org/bot1122400522:AAHS3fJlQqOjPqNt9jcGflN-KsOZN74NjvM/restrictChatMember", restrict);
      Logger.log(returneds.getContentText());
}*/

function identificar(e){
  var message = e.message.text;
  if (e.message.new_chat_members){
    var user1 = e.message.new_chat_participant.first_name;
    var SpreadSheet = SpreadsheetApp.openById("1CNqBmvbThO0KWsD_k9CBfyR_t3KEvatwB5TizDghnRA");
    var Sheet = SpreadSheet.getSheetByName("訊息"); 
    var msg = Sheet.getRange(1, 1).getValue(); 
    if(e.message.new_chat_participant.last_name)
    {
      var inline_keyboard = [
        [{
                "text": "點我驗證唷!",
                "callback_data": "verify"
            }]]
      var InlineKeyboardMarkup = {
        'inline_keyboard': inline_keyboard
    }
      var userid=JSON.parse(e.message.from.id);
      var user2 = e.message.new_chat_participant.last_name;
      var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "`"+user1+' '+user2+'` *欢迎加入本群组!我是本群组的专属机器人,請先點擊入群驗證。*'+'[论坛網址](www.bandbbs.cn)',
       "parse_mode":'Markdown',
       "disable_notification":true,
       'reply_markup': JSON.stringify(InlineKeyboardMarkup)
    } 
      var SpreadSheets = SpreadsheetApp.openById("1ub3m5ccwpnSW4y7nnjRHlywZqg29KOm7GFkkifPVVdE");
      var Sheets = SpreadSheets.getSheetByName("verify"); 
      var LastRows = Sheets.getLastRow();
      Sheets.getRange(LastRows+1, 1).setValue(userid);
     var ChatPermissions = {
      'can_send_messages':false,
      'can_send_media_messages':false,
      "can_send_other_messages":false,
      "can_add_web_page_previews":false,
      "can_send_polls":false,
      "can_change_info":false,
      "can_invite_users":false,
      "can_pin_messages":false
    }
      var restrict = {
        "chat_id": String(e.message.chat.id),
        "user_id": userid,
        "permissions":ChatPermissions
      }
      var returneds = UrlFetchApp.fetch("https://api.telegram.org/bot1122400522:AAHS3fJlQqOjPqNt9jcGflN-KsOZN74NjvM/restrictChatMember", restrict);
      Logger.log(returneds.getContentText());
      var a = JSON.parse(e.message.message_id);
      var b = ~~a;
      var deletejoin = {
        "method":"deleteMessage",
        "chat_id":String(e.message.chat.id),
        "message_id":b
      }
      start(deletejoin);
    }
    else
    {
      var inline_keyboard = [
        [{
                "text": "點我驗證唷!",
                "callback_data": "verify"
            }]]
      var InlineKeyboardMarkup = {
        'inline_keyboard': inline_keyboard
    }
      var userid=JSON.parse(e.message.from.id);
      var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "`"+user1+'` *欢迎加入本群组!我是本群组的专属机器人,請先點擊入群驗證。*'+'[论坛網址](www.bandbbs.cn)',
       "parse_mode":'Markdown',
       "disable_notification":true,
       'reply_markup': JSON.stringify(InlineKeyboardMarkup)
    } 
      var SpreadSheets = SpreadsheetApp.openById("1ub3m5ccwpnSW4y7nnjRHlywZqg29KOm7GFkkifPVVdE");
      var Sheets = SpreadSheets.getSheetByName("verify"); 
      var LastRows = Sheets.getLastRow();
      Sheets.getRange(LastRows+1, 1).setValue(userid);
      var ChatPermissions = {
      'can_send_messages':false,
      'can_send_media_messages':false,
      "can_send_other_messages":false,
      "can_add_web_page_previews":false,
      "can_send_polls":false,
      "can_change_info":false,
      "can_invite_users":false,
      "can_pin_messages":false
    }
      var restrict = {
        "chat_id": String(e.message.chat.id),
        "user_id": userid,
        "permissions":ChatPermissions
      }
      var returneds = UrlFetchApp.fetch("https://api.telegram.org/bot1122400522:AAHS3fJlQqOjPqNt9jcGflN-KsOZN74NjvM/restrictChatMember", restrict);
      Logger.log(returneds.getContentText());
      var a = JSON.parse(e.message.message_id);
      var b = ~~a;
      var deletejoin = {
        "method":"deleteMessage",
        "chat_id":String(e.message.chat.id),
        "message_id":b
      }
      start(deletejoin);
    }
    
    start(payload);
  }
  /*else if(e.callback_query.data)
  {
    var userid = JSON.parse(e.callback_query.from.id);
    var SpreadSheet = SpreadsheetApp.openById("1ub3m5ccwpnSW4y7nnjRHlywZqg29KOm7GFkkifPVVdE");
    var Sheet = SpreadSheet.getSheetByName("verify"); 
    var LastRow = Sheet.getLastRow();
    for(i=1;i<LastRow+1;i++)
    {
      var data = Sheet.getRange(LastRow+1, 1).getValue();
      if(data==userid)
      {
        var ChatPermissions = {
      'can_send_messages':true,
      'can_send_media_messages':true,
      "can_send_other_messages":true,
      "can_add_web_page_previews":true,
      "can_send_polls":true,
      "can_change_info":false,
      "can_invite_users":true,
      "can_pin_messages":false
    }
      var restrict = {
        "method": "restrictChatMember",
        "chat_id": String(e.message.chat.id),
        "user_id": userid,
        "permissions":ChatPermissions
      }
      start(restrict);
        var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "驗證成功!歡迎加入米壇家族!",
    }
        Sheet.getRange(LastRow+1, 1).clearContent();
      }
    }
    start(payload);
  }*/
  else if(message=="/time")
  {
    var d = new Date();
    var currentTime = d.toLocaleTimeString();
    var response = UrlFetchApp.fetch('https://www.bandbbs.cn/whats-new/latest-activity');
    var $ = Cheerio.load(response.getContentText());
    var title = $('div.contentRow-title').first().text();
    var content = $('div.contentRow-snippet').first().text();
    var time = $('div.contentRow-minor').first().text();
    var threadlink = $('div.contentRow-title > a').first().attr('href');
    var url = "https://www.bandbbs.cn"+threadlink;
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "現在時間:\*"+currentTime+"*\n\n最新動態(_"+time+"_):\*"+title+"*"+content+"\n[(查看完整內容)]("+url+")",
      "parse_mode":"Markdown",
      "disable_notification":true,
      "disable_web_page_preview":true,
    } 
    start(payload);
  }
  else if(message=="/time@Bandbbs_bot")
  {
    var d = new Date();
    var currentTime = d.toLocaleTimeString();
    var response = UrlFetchApp.fetch('https://www.bandbbs.cn/whats-new/latest-activity');
    var $ = Cheerio.load(response.getContentText());
    var title = $('div.contentRow-title').first().text();
    var content = $('div.contentRow-snippet').first().text();
    var time = $('div.contentRow-minor').first().text();
    var threadlink = $('div.contentRow-title > a').first().attr('href');
    var url = "https://www.bandbbs.cn"+threadlink;
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "現在時間:\*"+currentTime+"*\n\n最新動態(_"+time+"_):\*"+title+"*"+content+"\n[(查看完整內容)]("+url+")",
      "parse_mode":"Markdown",
      "disable_notification":true,
      "disable_web_page_preview":true,
    } 
    start(payload);
  }
  else if(message=="版本")
  {
    var inline_keyboard = [[{
                "text": "開啟連結",
                "url": "https://www.bandbbs.cn/threads/2482/"
            }]]
    var InlineKeyboardMarkup = {
        'inline_keyboard': inline_keyboard
    }
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "小米手環版本對照表在這!",
      "disable_notification":true,
      'reply_markup': JSON.stringify(InlineKeyboardMarkup),
      "disable_web_page_preview":true,
    } 
    start(payload);
  }
  else if(message=="/status@Bandbbs_bot")
  {
    var response = UrlFetchApp.fetch('https://t.me/band_bbs');
    var $ = Cheerio.load(response.getContentText());
    var status = $('div.tgme_page_extra').text();
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "reply_to_message_id":e.message.message_id,
      "text": status,
      "disable_notification":true,
    } 
       start(payload);   
  }
 else if (message=="/n"){
   var result=UrlFetchApp.fetch("https://www.bandbbs.cn/whats-new");
   var titlexp=/<a href="\/threads\/[0-9]{1,5}\/" class="" data-tp-primary="on" data-xf-init="preview-tooltip" data-preview-url="\/threads\/[0-9]{1,5}\/preview">([\s\S]*?)<\/a>/g;
   var titleresult=result.getContentText().match(titlexp);
   var title=new array(10);
   for(var i in titleresult)
   {
     var actualtitle=titleresult[i].replace(/<a href="\/threads\/[0-9]{1,5}\/" class="" data-tp-primary="on" data-xf-init="preview-tooltip" data-preview-url="\/threads\/[0-9]{1,5}\/preview">/g,"").replace(/<\/a>/g,"");
     title[i]=actualtitle;
   }
   /*"好的,以下是米壇最新的10項資源!\n"+title[0]+"\n"+title[1]+"\n"+title[2]+"\n"+title[3]+"\n"+title[4]+"\n"+title[5]+"\n"+title[6]+"\n"+title[7]+"\n"+title[8]+"\n"+title[9]*/
   
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "好的,以下是米壇最新的10項資源!\n"+title[0]+"\n"+title[1]+"\n"+title[2]+"\n"+title[3]+"\n"+title[4]+"\n"+title[5]+"\n"+title[6]+"\n"+title[7]+"\n"+title[8]+"\n"+title[9],
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if (message=="/weather@Bandbbs_bot"){
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "天氣查詢使用方法: /weather <地名>",
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if (message.substring(0,8)=="/weather"){
    var place = message.substr(9,message.length-9);
    var place1 = LanguageApp.translate(place, 'zh', 'en');
    var weadata = UrlFetchApp.fetch("http://api.openweathermap.org/data/2.5/weather?q="+place1+"&units=metric&appid=99b901186201f09a35d3ca104f55f33f&lang=zh_tw");
    var data = JSON.parse(weadata);
    var code = JSON.stringify(data.message);
    if(code=="city not found")
    {
      var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "查無此地名!",
    }
    }
    else
    {
      
    var coordlon = JSON.stringify(data.coord.lon);
    var coordlat = JSON.stringify(data.coord.lat);
    var des = JSON.stringify(data.weather[0].description);
    var temp = JSON.stringify(data.main.temp);
    var feelstemp = JSON.stringify(data.main.feels_like);
    var min = JSON.stringify(data.main.temp_min);
    var max = JSON.stringify(data.main.temp_max);
    var pressure = JSON.stringify(data.main.pressure);
    var humidity = JSON.stringify(data.main.humidity);
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "*"+place+"*的天氣如下:\n主要:*"+des+"*\n目前溫度:`"+temp+"C`\n體感溫度:`"+feelstemp+"°C`\n最低:`"+min+"°C` 最高:`"+max+"°C`\n氣壓:`"+pressure+"hpa`\n濕度:`"+humidity+"%`\n```(經度:"+coordlon+"/緯度:"+coordlat+")```",
      "reply_to_message_id":e.message.message_id,
      "parse_mode":"Markdown"
    } 
    }
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if (message=="/translate@Bandbbs_bot"){
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "翻譯使用方法: /translate <翻譯內容>/原語言/翻譯成   Supported Languages: en, zh, zh-TW, ja, ko, fr, ru, de, fi, pl, nl, ar, fa, hi, da, cs, ms, no, pt, sv, tr, es, he, it, id",
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if (message.substring(0,33)=="https://www.bandbbs.cn/resources/"){
    var response = UrlFetchApp.fetch(message);
    var $ = Cheerio.load(response.getContentText());
    var title = $('h1.p-title-value').text();
    var category = $('ul.p-breadcrumbs > li > a > span').last().text();
    var categorylink = $('ul.p-breadcrumbs > li > a').last().attr('href');
    var time = $('li > a').first().text();
    var rate = $('span.ratingStarsRow-text').first().text();
    var info = $('dl.pairs pairs--justified > dd').toArray();
    var username = $('span.usernameu-concealed').first().text();
    var download = info[1];
    var view = info[2];
    var lastupdate = $('time.u-dt').last().text();
    
    var inline_keyboard = [[{
                "text": "開啟連結",
                "url": message
            },{
                "text": "下載資源",
                "url": message+"/download"
            }]]
    var InlineKeyboardMarkup = {
        'inline_keyboard': inline_keyboard
    }
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "reply_to_message_id":e.message.message_id,
      "text": '\*'+title+'*'+'\n'+'👤'+'\*'+username+'*\n_'+rate+'_'+'\n分類:['+category+'](https://www.bandbbs.cn/'+categorylink+')'+'\n_下載次數:'+download+'_'+'\n_查看次數:'+view+'_'+'\n_最後更新:'+lastupdate+'_'+'\n_首次發布:'+time+'_',
      "parse_mode":"Markdown",
      'reply_markup': JSON.stringify(InlineKeyboardMarkup),
      "disable_web_page_preview":true,
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if (message.substring(0,31)=="https://www.bandbbs.cn/threads/"){
    var response = UrlFetchApp.fetch(message);
    var $ = Cheerio.load(response.getContentText());
    var title = $('h1.p-title-value').text();
    var content = $('div.bbWrapper').first().text();
    var time = $('a > time').first().text();
    var username = $('.username').first().text();
    var username1 = $('strong').first().text();
    var category = $('ul.p-breadcrumbs > li > a > span').last().text();
    var categorylink = $('ul.p-breadcrumbs > li > a').last().attr('href');
    var inline_keyboard = [[{
                "text": "開啟連結",
                "url": message
            }]]
    var InlineKeyboardMarkup = {
        'inline_keyboard': inline_keyboard
    }
   /* var payload1 = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": '一分鐘自毀啟動',
    } 
    start(payload1);*/
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "reply_to_message_id":e.message.message_id,
      "text": '\*'+title+'(帖子)*'+'\n'+'\*👤'+username+"("+username1+"*)\n\n"+content+"\n\n分類:["+category+"](https://www.bandbbs.cn"+categorylink+")\n_發布時間:"+time+'_',
      "parse_mode":"Markdown",
      'reply_markup': JSON.stringify(InlineKeyboardMarkup),
      "disable_web_page_preview":true,
    } 
    console.log(String(e.message.chat.id))
    start(payload);
    /*Utilities.sleep(60000);
    var deletej = {
        "method":"deleteMessage",
        "chat_id":String(e.message.chat.id),
        "message_id":e.message.message_id+1,
      }
    start(deletej);
    var deletejj = {
        "method":"deleteMessage",
        "chat_id":String(e.message.chat.id),
        "message_id":e.message.message_id+2,
      }
    start(deletejj);*/
  }
  else if (message=="/link"||message=="/link@Bandbbs_bot"){
    var payload1 = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "reply_to_message_id":e.message.message_id,
      "text": "好的,以下是所有相關連結。",
    } 
    console.log(String(e.message.chat.id))
    start(payload1);
    var inline_keyboard = [
        [{
                "text": "米壇",
                "url": "https://www.bandbbs.cn/"
            },
            {
                "text": "twitter",
                "url": "https://twitter.com/bandbbs_offical"
            },
            {
                "text": "微博",
                "url": "https://weibo.com/u/6330102690"
            }
        ],
        [{
            "text": "最新资源",
            "url": "https://www.bandbbs.cn/whats-new/"
        },{
            "text": "论坛公告",
            "url": "https://www.bandbbs.cn/forums/2/"
        }],
        [{
            "text": "小米手环5",
            "url": "https://www.bandbbs.cn/categories/174/"
        },
        {
            "text": "小米手环4",
            "url": "https://www.bandbbs.cn/categories/27/"
        },{
            "text": "小米手环3",
            "url": "https://www.bandbbs.cn/categories/4/"
        },{
            "text": "小米手环2",
            "url": "https://www.bandbbs.cn/categories/28/"
        }],
        [{
            "text": "安卓智能手表",
            "url": "https://www.bandbbs.cn/#.116"
        },{
            "text": "Amazfit手环/手表",
            "url": "https://www.bandbbs.cn/#amazfit.41"
        }],
        [{
            "text": "华为/荣耀手环手表手环",
            "url": "https://www.bandbbs.cn/#.71"
        },{
            "text": "黑加手环",
            "url": "https://www.bandbbs.cn/#.38"
        }],
        [{
            "text": "小米手表",
            "url": "https://www.bandbbs.cn/#.105"
        },{
            "text": "论坛杂务",
            "url": "https://www.bandbbs.cn/#.92"
        },{
            "text": "**ESMC**",
            "url": "https://www.bandbbs.cn/#.92"
        }]
    ]
    var InlineKeyboardMarkup = {
        'inline_keyboard': inline_keyboard
    }
    var payload = {
        "method": "sendPhoto",
        'chat_id': String(e.message.chat.id),
        'photo': 'https://cdn.jsdelivr.net/gh/Bandbbs/Bandbbs_CDN@1.4/bandbbslogo/logo_header.png',
        'reply_markup': JSON.stringify(InlineKeyboardMarkup)
    }
    start(payload);
  }
  else if (message.substring(0,10)=="/translate"){
    var data = message.substr(11,message.length-11);
    var data1 = data.split('/',3);
    var trdata = data1[0];
    var origla = data1[1];
    var finala = data1[2];
    var result = LanguageApp.translate(trdata, origla, finala);
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": result,
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if (message=="/wiki@Bandbbs_bot"){
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "維基百科查詢使用方法: /wiki <keyword>",
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if(message.substring(0,5)=="/wiki")
  {
    var keyword = message.substr(6,message.length-6);
    var wikidata = UrlFetchApp.fetch("https://zh.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + keyword + "&utf8");
    var wwdata = JSON.parse(wikidata);
    /*
    var pageid = Object.keys(wikidata.query.pages)[0];
   var content = wikidata.query.pages[pageid].extract;*/
    var content = Object.keys(wwdata.query.pages).map(pageId => wwdata.query.pages[pageId]).map(page=>page.extract);
    var final = JSON.stringify(content);
    var finals = final.substr(2,final.length-4);
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": finals,
    } 
    if(final=="[null]")
    {
      var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "查無此內容!",
    } 
      }
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if (message=="/learntalk@Bandbbs_bot"){
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "用法:/learntalk <關鍵字>/<回覆內容>",
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  else if (message.substring(0,10)=="/learntalk"){
    var data = message.substr(11,message.length-11);
    var data2 = data.split("/",2);
    var keyword = data2[0];
    var reply = data2[1];
    var SpreadSheet = SpreadsheetApp.openById("1-nUCL9ekNbdGv7mHt3iVm4ZLC6gRD6F5ez4rPoacHs4");
    var Sheet = SpreadSheet.getSheetByName("關鍵字"); 
    var LastRow = Sheet.getLastRow();
    var check = 0;
    for(i=1;i<=LastRow;i++)
    {
      if(keyword==Sheet.getRange(i, 1).getValue())
      {
        var payload = {
          "method": "sendMessage",
          "chat_id": String(e.message.chat.id),
          "text": "此關鍵字回復已被別人加入囉!",
        } 
        check = 1;
      }
    }
    if(check==0)
    {
      if(reply)
      {
        var SpreadSheet = SpreadsheetApp.openById("1-nUCL9ekNbdGv7mHt3iVm4ZLC6gRD6F5ez4rPoacHs4");
      var Sheet = SpreadSheet.getSheetByName("關鍵字"); 
    var LastRow = Sheet.getLastRow();
    Sheet.getRange(LastRow+1, 1).setValue(keyword);  
    
    var Sheet2 = SpreadSheet.getSheetByName("回復"); 
    var LastRow = Sheet2.getLastRow();
    Sheet2.getRange(LastRow+1, 1).setValue(reply);
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "好的!",
    } 
      }
      else
      {
        var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "請輸入回覆內容",
    } 
      }
      
    }
    start(payload);
  }
  else if (message=="/setimportantmsg@Bandbbs_bot"){
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "用法:/setimportantmsg <訊息>",
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  ///////////////////////////
  else if (message=="/msgcount@Bandbbs_bot"){
    var SpreadSheet = SpreadsheetApp.openById("1D0zJv8yFJn-PjEfLDnEOTU8n8S5aQm7EiGZ55k9rRyE");
    var Sheet = SpreadSheet.getSheetByName("紀錄收到的訊息");
    var LastRow = Sheet.getLastRow();
    var result = 0;
    for(i=0;i<=LastRow;i++)
    {
      var data = Sheet.getRange(LastRow+1, 2).getValue();
      var data1 = JSON.parse(data);
      var check1 = data1.message.from.chat.type;
      var check = JSON.stringify(check1);
      if(check=="supergroup")
        {
          result=result+1;
        }
    }
    //////////////////////
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "從3/29截至現在總共: "+result +"條訊息",
    } 
    console.log(String(e.message.chat.id))
    start(payload);
  }
  
  else if (message=="重要消息"||message=="/important@Bandbbs_bot"){
    var SpreadSheet = SpreadsheetApp.openById("1CNqBmvbThO0KWsD_k9CBfyR_t3KEvatwB5TizDghnRA");
    var Sheet = SpreadSheet.getSheetByName("訊息"); 
    var msg = Sheet.getRange(1, 1).getValue(); 
    var Sheet2 = SpreadSheet.getSheetByName("圖片"); 
    var photourl = Sheet2.getRange(1, 1).getValue();
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": '```'+msg+'```',
      "parse_mode":'Markdown'
    } 
    /*var payload1 = {
      "method": "sendPhoto",
      "chat_id": String(e.message.chat.id),
      "photo": photourl,
    
  }*/
    start(payload);
    /*start(payload1);*/
    }
  else if (message.substring(0,16)=="/setimportantmsg"){
    if(e.message.from.username=="kindyear"||e.message.from.username=="Mifan426"||e.message.from.username=="Jinyulink"||e.message.from.username=="cworld0")
    {
    var msg = message.substr(17,message.length-17);
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "好的! 將 "+msg+" 設置為重要消息",
    } 
    var SpreadSheet = SpreadsheetApp.openById("1CNqBmvbThO0KWsD_k9CBfyR_t3KEvatwB5TizDghnRA");
    var Sheet = SpreadSheet.getSheetByName("訊息"); 
    Sheet.getRange(1, 1).setValue(msg);
      start(payload);
    }
    else
    {
      var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "你沒有權限!",
    }
       start(payload);
    }
    }
  else if (message.substring(0,18)=="/setimportantphoto"){
    if(e.message.from.username=="kindyear"||e.message.from.username=="Jinyulink"||e.message.from.username=="Mifan426"||e.message.from.username=="cworld0")
    {
    var url = message.str(19,message.length-19);
    var SpreadSheet = SpreadsheetApp.openById("1CNqBmvbThO0KWsD_k9CBfyR_t3KEvatwB5TizDghnRA");
    var Sheet3 = SpreadSheet.getSheetByName("圖片"); 
    Sheet3.getRange(1, 1).setValue(url);
    var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "好的!",
    } 
      start(payload);
    }
    else
    {
      var payload = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "你沒有權限!",
    }
    start(payload);
    }
    }
  else {
    var SpreadSheet = SpreadsheetApp.openById("1-nUCL9ekNbdGv7mHt3iVm4ZLC6gRD6F5ez4rPoacHs4");
    
    var Sheet = SpreadSheet.getSheetByName("關鍵字"); 
    var LastRow = Sheet.getLastRow();
    
    var Sheet2 = SpreadSheet.getSheetByName("回復"); 
    
    for(i=1;i<=LastRow;i++)
    {
      if(message==Sheet.getRange(i, 1).getValue())
      {
        var payload = {
          "method": "sendMessage",
          "chat_id": String(e.message.chat.id),
          "text": Sheet2.getRange(i, 1).getValue(),
        } 
      }
    }
    start(payload);
  }
  /*else if (e.message.sticker){
    var mensaje = {
      "method": "sendSticker",
      "chat_id": String(e.message.chat.id),
      "sticker": e.message.sticker.file_id
    }
   }
  else if (e.message.photo){
    var array = e.message.photo;
    var text = array[1];
    var mensaje = {
      "method": "sendPhoto",
      "chat_id": String(e.message.chat.id),
      "photo": text.file_id
    }
   }*/
  
}
function start(payload) {
    var data = {
        "method": "post",
        "payload": payload
    }
    var d = new Date();
    var SpreadSheet = SpreadsheetApp.openById("1D0zJv8yFJn-PjEfLDnEOTU8n8S5aQm7EiGZ55k9rRyE");
    var Sheet = SpreadSheet.getSheetByName("紀錄發送的訊息");
    var LastRow = Sheet.getLastRow();
    Sheet.getRange(LastRow + 1, 1).setValue(d);
    Sheet.getRange(LastRow + 1, 3).setValue(data);
    var returned = UrlFetchApp.fetch("https://api.telegram.org/bot1122400522:AAHS3fJlQqOjPqNt9jcGflN-KsOZN74NjvM/", data);
    Logger.log(returned.getContentText());
    Sheet.getRange(LastRow + 1, 2).setValue(d);
}
