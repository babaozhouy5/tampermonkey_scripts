// ==UserScript==
// @name         滑动条样式
// @namespace    [url=mailto:nwglbbz@gmail.com]nwglbbz@gmail.com[/url]
// @version      0.1
// @description  更改默认滑动条样式
// @author       babaozhouy5
// @match        *://*/*
// @grant        GM_log
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand

// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var style = GM_getValue('scrollStyle') !== undefined ? GM_getValue('scrollStyle') : 0;
    switch(style){
        case 0:
            GM_addStyle('*::-webkit-scrollbar {width:8px;height:1px;}');
            GM_addStyle('*::-webkit-scrollbar-thumb {border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background: #273c4e47;}');
            GM_addStyle('*::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #ededed73;}');
            break;
        case 1:
            GM_addStyle('*::-webkit-scrollbar {width:8px;height:1px;}');
            GM_addStyle('*::-webkit-scrollbar-thumb {border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background-color: #F90;background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);}');
            GM_addStyle('*::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #ededed73;}');
            break;
        case 2:
            GM_addStyle('*::-webkit-scrollbar {width:8px;height:1px;}');
            GM_addStyle('*::-webkit-scrollbar-thumb {border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background: #535353;}');
            GM_addStyle('*::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #ededed73;}');
            break;
        default:
            break;
    }
    
    GM_registerMenuCommand('滚动条样式0', function(){
        GM_setValue('scrollStyle', 0);
        GM_addStyle('*::-webkit-scrollbar {width:8px;height:1px;}');
        GM_addStyle('*::-webkit-scrollbar-thumb {border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background: #273c4e47;}');
        GM_addStyle('*::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #ededed73;}');
        });
    
    GM_registerMenuCommand('滚动条样式1', function(){
        GM_setValue('scrollStyle', 1);
        GM_addStyle('*::-webkit-scrollbar {width:8px;height:1px;}');
        GM_addStyle('*::-webkit-scrollbar-thumb {border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background-color: #F90;background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);}');
        GM_addStyle('*::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #ededed73;}');
        });
    GM_registerMenuCommand('滚动条样式2', function(){
        GM_setValue('scrollStyle', 2);
        GM_addStyle('*::-webkit-scrollbar {width:8px;height:1px;}');
        GM_addStyle('*::-webkit-scrollbar-thumb {border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background: #535353;}');
        GM_addStyle('*::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #ededed73;}');
        });
})();