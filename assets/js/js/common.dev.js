"use strict";

document.getElementsByTagName('html')[0].setAttribute('lang', localStorage.getItem('lang') || 'en_us');

function setLang(lang) {
  localStorage.setItem('lang', lang);
  window.location.reload();
}

function appendChangeLangArea() {
  var body = document.getElementsByTagName('body')[0];
  var oldChangeLangArea = document.querySelector('div#change-lang-area');

  if (oldChangeLangArea) {
    return;
  }

  for (var firstOrLastLoop = 0; firstOrLastLoop < 2; ++firstOrLastLoop) {
    var changeLangArea = document.createElement('div');
    changeLangArea.innerHTML = "\n\t\t\t\t<en_us>If you want to change the language, please click the button.</en_us>\n\t\t\t\t<zh_cn>\u5982\u679C\u60A8\u60F3\u5207\u6362\u8BED\u8A00\uFF0C\u8BF7\u70B9\u51FB\u4E0B\u4E00\u884C\u76F8\u5E94\u6309\u94AE\u3002</zh_cn>\n\t\t\t\t<zh_tw>\u5982\u679C\u60A8\u60F3\u5207\u63DB\u8A9E\u8A00\uFF0C\u8ACB\u9EDE\u64CA\u4E0B\u4E00\u884C\u76F8\u61C9\u6309\u9215\u3002</zh_tw>\n\t\t\t\t<br />\n\t\t\t\t<button type=\"button\" onclick=\"setLang('en_us')\"><en_us>En</en_us><zh_cn>Chinese</zh_cn><zh_tw>Traditional</zh_tw></button>\n\t\t\t\t<button type=\"button\" onclick=\"setLang('zh_cn')\"><en_us>\u82F1\u8BED</en_us><zh_cn>\u7B80\u4F53</zh_cn><zh_tw>\u7E41\u4F53</zh_tw></button>\n\t\t\t\t<button type=\"button\" onclick=\"setLang('zh_tw')\"><en_us>\u82F1\u8A9E</en_us><zh_cn>\u7C21\u9AD4</zh_cn><zh_tw>\u7E41\u9AD4</zh_tw></button>";

    if (firstOrLastLoop) {
      body.appendChild(changeLangArea);
    } else {
      body.insertBefore(changeLangArea, body.children[0]);
    }
  }
}

appendChangeLangArea();