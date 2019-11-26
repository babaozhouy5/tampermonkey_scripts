// ==UserScript==
// @icon         https://www.douyu.com/favicon.ico
// @name         斗鱼弹幕弹窗
// @namespace    [url=mailto:nwglbbz@gmail.com]nwglbbz@gmail.com[/url]
// @version      0.2
// @description  斗鱼播放器内弹幕弹窗
// @author       babaozhouy5
// @match        https://www.douyu.com/*
// @require      http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js
// @grant        GM_log
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    GM_addStyle(".moveBar {position:absolute;width:245px;height:330px;background:#08466570;z-index:500;border-radius:10px 10px 10px 10px;}");
    GM_addStyle(".danmu_banner {cursor:move;padding:2px 0px 2px 0px;border-bottom:solid 1px #ada6a6;text-align:center;border-radius:10px 10px 0px 0px;}");
    GM_addStyle('.danmu_content {width:240px;height:280px;overflow:auto;padding-left:5px;display:block;}');
    GM_addStyle('.danmu_content::-webkit-scrollbar {width:8px;height:1px;}');
    GM_addStyle('.danmu_content::-webkit-scrollbar-thumb {border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background: #273c4e47;}');
    GM_addStyle('.danmu_content::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #ededed73;}');
    GM_addStyle('.danmu_content_wrap {width:220px;word-wrap:break-word;}');
    GM_addStyle('.danmu_footer {padding:0px 0px 4px 0px;border-top:solid 1px #ada6a6;text-align:center;border-radius:0px 0px 10px 10px;}}');

    // remove
    $(function () {
        $('div#js-room-activity').remove();
        $('div#js-bottom').remove();
        $('div#js-player-guessgame').remove();
        $('div#js-player-toolbar').remove();
    });

    // construct moveableDiv
    $(function () {
        var host_name = $('a.Title-anchorName')[0].title;

        // construct moveable div
        var moveableDiv = "<div class='moveBar'>";

        // danmu_banner
        moveableDiv += "<div class='danmu_banner'>";
        moveableDiv += "<font color='#ffffff'>欢迎来到</font>";
        moveableDiv += "<font style='font-size:15px;font-style:italic;color:#ff1ed7'> " + host_name + " </font>";
        moveableDiv += "<font color='#ffffff'>的直播间</font>";
        moveableDiv += "</div>";

        // danmu_content
        moveableDiv += "<div class='danmu_content'><div class='danmu_content_wrap' /></div>";

        // danmu_footer
        moveableDiv += "<div class='danmu_footer'>";
        moveableDiv += "<div id='close_div' style='width:10px;height:10px;margin:2px 2px 2px 5px;display:inline-block;float:left;text-align:center;vertical-align:middle;cursor:pointer;'><font style='color:#a99c9c;'>X</font></div>";
        moveableDiv += "<font color='#ffffff'>长度:</font>";
        moveableDiv += "<input id='max_danmu_len' type='text' style='width:40px;background:transparent;border:0px;color:#f7c3c3;' value='1000' />";
        moveableDiv += "<font color='#ffffff'>热度:</font>";
        moveableDiv += "<font id='hot' color='#f7c3c3' />";
        moveableDiv += "<div id='min_div' style='width:10px;height:1px;margin:2px 5px 2px 2px;display:inline-block;float:right;border:solid #a99c9c;cursor:pointer;' />";
        moveableDiv += "</div>";

        $('div.layout-Player-videoMain').prepend(moveableDiv);

        setInterval(function () {
            if ($('div.Title-anchorText').length && $('font#hot').length) {
                $('font#hot')[0].innerText = $('div.Title-anchorText')[0].innerText;
            }
        }, 2000);
    });

    // add move ability to moveableDiv
    $(function () {
        $('div.danmu_banner').mousedown(
            function (event) {
                var isMove = true;
                var abs_x = event.pageX - $('div.moveBar').position().left;
                var abs_y = event.pageY - $('div.moveBar').position().top;
                $(document).mousemove(function (event) {
                    if (isMove) {
                        var obj = $('div.moveBar');
                        var moveX = event.pageX - abs_x;
                        var moveY = event.pageY - abs_y;
                        obj.css({ 'left': moveX, 'top': moveY });
                    }
                }).mouseup(
                    function () {
                        var obj = $('div.moveBar');

                        var objLeft = obj.position().left;
                        var objTop = obj.position().top;
                        var selfHeight = obj[0].clientHeight;
                        var selfWidth = obj[0].clientWidth;
                        var parentHeight = obj[0].parentElement.clientHeight;
                        var parentWidth = obj[0].parentElement.clientWidth;

                        if (objLeft < 0) {
                            obj.css({ 'left': 0 });
                        }
                        if (objLeft > parentWidth - selfWidth) {
                            obj.css({ 'left': parentWidth - selfWidth });
                        }
                        if (objTop < 0) {
                            obj.css({ 'top': 0 });
                        }
                        if (objTop > parentHeight - selfHeight) {
                            obj.css({ 'top': parentHeight - selfHeight });
                        }
                        isMove = false;
                    });
            });

        // minimize
        // $('#min_div').hover(
        // function(){
        // $('#min_div').css("background-color","yellow");
        // },
        // function(){
        // $('#min_div').css("background-color","pink");
        // });
        $('#min_div').click(
            function (event) {
                var dis_style = $('div.danmu_content')[0].style.display;
                if (dis_style === "none") {
                    $('div.danmu_content')[0].style.display = "block";
                    $('div.danmu_content_wrap')[0].style.display = "block";
                    $('div.moveBar')[0].style.height = "330px";
                    $('div.moveBar')[0].style.background = "#08466570";
                    $('#min_div')[0].style.height = "1px";
                } else {
                    $('div.danmu_content')[0].style.display = "none";
                    $('div.danmu_content_wrap')[0].style.display = "none";
                    $('div.moveBar')[0].style.height = "50px";
                    $('div.moveBar')[0].style.background = "#dddddd45";
                    $('#min_div')[0].style.height = "10px";
                }
            });

        // close
        // $('#close_div').hover(
        // function(){
        // $('#close_div').css("background-color","yellow");
        // },
        // function(){
        // $('#close_div').css("background-color","pink");
        // });
        $('#close_div').click(
            function (event) {
                $('div.moveBar')[0].remove();
                $('div.chat-cont-wrap').unbind("scroll");
            });
    });

    $(function () {
        var check_exist = setInterval(function () {
            if ($('ul#js-barrage-list').length) {
                var last_danmu = null;
                $('ul#js-barrage-list').on('DOMNodeInserted', function () {
                    // GM_log("success");
                    var danmu_list = $('ul.Barrage-list')[0];
                    var len = danmu_list.children.length;
                    var new_danmu = danmu_list.children[len - 1].innerText;

                    if (new_danmu != last_danmu) {
                        var name, say, danmuDiv;
                        var name_color = '#03e6ff', say_color = 'white', welcome_color = '#efed0b';
                        var items = new_danmu.split('：');
                        if (items.length > 1) {
                            name = items[0];
                            say = items[1];
                            danmuDiv = "<div class='danmu'>";
                            danmuDiv += "<font size='2' color='" + name_color + "'>" + name + "：</font>";
                            danmuDiv += "<font size='2' color='" + say_color + "'>" + say + "<br/></font></div>";
                        } else {
                            danmuDiv = "<div class='danmu'>";
                            danmuDiv += "<font size='2' color='" + welcome_color + "'>" + new_danmu + "<br/></font></div>";
                        }

                        var scrollTop = $("div.danmu_content")[0].scrollTop;            // xx
                        var containerHeight = $("div.danmu_content")[0].clientHeight;   // 280
                        var scrollHeight = $("div.danmu_content_wrap")[0].clientHeight; // xx
                        $("div.danmu_content_wrap").append(danmuDiv);

                        if (scrollTop + containerHeight === scrollHeight) {
                            $("div.danmu_content")[0].scrollTop = $("div.danmu_content")[0].scrollHeight;
                        }

                        var max_danmu_len = parseInt($('#max_danmu_len').val());
                        //GM_log(max_danmu_len);
                        if ($('.danmu_content_wrap div').size() > max_danmu_len) {
                            var need_remove = $('.danmu_content_wrap div').size() - max_danmu_len;
                            $.each($('.danmu_content_wrap div:lt(' + need_remove + ')'), function () {
                                //GM_log('del success!');
                                $(this).remove();
                            });
                        }
                        last_danmu = new_danmu;
                    }
                });
                clearInterval(check_exist);
            }
        }, 2000);
    });
})();