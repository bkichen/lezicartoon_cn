document.domain='1ting.com';
var g_lyric = window.g_lyric = new function(){
    this.next = function(i){
        var result = "";
        var i = i + 1;
        if(this.items[i]){
            t = this.items[i].split("]");
            if (t[1] == "")
                result = this.next(i);
            else
                result = t[1]
        }
        return result;
    };

    this.time = function(str){
        var tb, ta = str.split(':');

        if (ta.length < 2){
            return 0;
        }

        if (ta[1].indexOf('.') > 0) {
            tb = ta[1].split('.');
            return ta[0] * 60 * 1000 + tb[0] * 1000 + tb[1] * 10;
        }

        return ta[0] * 60 * 1000 + ta[1] * 1000;
    };

    this.display = function(lyric){
        if(!lyric){
            $('#lrc').html('抱歉，这首歌暂时还没有歌词。');
            return false;
        }

        this.lines = [];
        this.current = 0;
        this.items = lyric.split('[');

        if(this.items.length < 5){
            $('#lrc').html(lyric.replace(/[\r\n]+/g, '<br/>'));
            this.items = [];
            return false;
        }

        for (var i = 0; i < this.items.length; i++){
            var t = this.items[i].split(']'),
                g = {time:this.time(t[0]),value:t[1]};
            if (isNaN(g.time)){
                continue;
            }
            if (g.value == ''){
                g.value = this.next(i);
            }
            this.lines.push(g);
        }

        this.lines.sort(function(x, y) {
            return x.time > y.time ? 1 : x.time < y.time ? -1 : 0;
        });

        lyric = '';
        for (var i = 0; i < this.lines.length; i++){
            if (!this.lines[i].value) {
                this.lines[i].value = '';
            }
            lyric += "<p id='lyric-" + i + "'>" + this.lines[i].value + "</p>";
        }
        $('#lrc').html(lyric);
        $('.lrcbox').css('visibility', 'visible');
        this.start();
    };

    this.pause = function(){
        if(this.interval){
            clearInterval(this.interval);
        }
    };

    this.start = function(){
        var a = this;
        if(!this.items){
            return false;
        }
        if(this.interval){
            clearInterval(this.interval);
        }

        this.interval = setInterval(function(){
            a.loop();
        }, 13);
    };

    this.scroll = function(){
        var index = this.current;
        if(this.current > 6 && this.current + 6 < this.lines.length){
            index = this.current - 5;
        }
        var node = $('#lyric-' + index);
        if(node.length){
            var t = node.offset().top * -1;
            var p = (yplayer.position() - 15) / yplayer.duration();
            var t = Math.ceil($('.lrcbox .jspPane').height() * p * -1);
            $('.lrcbox .jspPane').css('top', t);
        }
    };

    this.loop = function(){
        var lines = this.lines,
            len = this.lines.length,
            time = yplayer.position() * 1000,
            scroller = this.scroller;

        this.scroll();

        if(this.current >= len - 1 || this.current < 0){
            this.current = 0;
            $('#lrc p.current').removeAttr('class');
            this.scroll();
            return true;
        }

        var prev = lines[this.current].time;
        var next = lines[this.current + 1].time;

        if (time >= prev && time < next) {
            return true;
        }

        while(this.current < len - 1 && next < time){
            next = lines[++this.current].time;
        }

        this.current = this.current + (time >= next ? 1 : -1);

        $('#lrc p.current').removeAttr('class');
        $('#lyric-' + this.current).attr('class', 'current');

        this.scroll();
    };
};

var g_fire = function (tpl){
    var a = this;
    return tpl.replace(/\{\{([a-z_]+)\}\}/g, function(m, k){
        return k == 'this'
               ? encodeURIComponent(JSON.stringify(a))
               : a[k];
    });
};

function login() {
    function cookie(k){
        var v = "";
        var s = k+"=",c = document.cookie,l=c.length;
        if (l > 0) {
            var os = c.indexOf(s);
            if (os != -1) {
                os += s.length;
                var ed = c.indexOf(";", os);
                if (ed == -1) ed = l;
                v = decodeURIComponent(c.substring(os, ed)).replace(/\+/g,' ');
            }
        }
        return v;
    }
    function receive(){
        var greeting,hour = new Date().getHours(),
            id = cookie('OneId'),
            user = cookie('OneNick')||cookie('OneUser'),
            ht = "";
        if(hour >= 6 && hour < 12){
            greeting='上午好!';
        }else if(hour>=12 && hour<18){
            greeting='下午好!';
        }else if(hour>=18 && hour<23){
            greeting='晚上好!';
        }else{
            greeting='夜深了 请注意休息!';
        }
        if(id && /^\d+$/.test(id) && user && /^[^<>\"\']+$/.test(user)){
            ht = '<p class="user-welcome">'+
                    '<a href="http://my.1ting.com/profile" class="link-username">'+user+'</a>'+greeting+
                '</p>'+
                '<div class="user-action" id="user_login_action">'+
                    '<a href="http://my.1ting.com/" class="act-fav">我的收藏</a>'+
                    '<div>'+
                        '<a href="http://my.1ting.com/" target="_blank">用户中心</a>'+
                        '<a href="http://my.1ting.com/logout">退出登录</a>'+
                    '</div>'+
                '</div>';
            $('#user-login').html(ht).show();
            $('#user-guest').hide();
            bindEvent( $("#user_login_action") );
        }else{
            $('#user-guest').show();
            $('#user-login').hide();
        }
    }
    function bindEvent(ctn) {
        var timeId, time = 500,
            slideTime = 200,
            child = ctn.children("div"),
            upClass = "user-action-arrow-up";
        ctn.hover(function() {
            timeId = setTimeout(function() {
                ctn.addClass(upClass);
                child.slideDown(slideTime);
            }, time);
        }, function() {
            ctn.removeClass(upClass);
            clearTimeout(timeId);
            child.slideUp(slideTime);
        });
    }
    receive();
    setInterval(receive, 3000);
}

function search(obj) {
    var k = $('#sq'),
        v = $('#st').text(),
        b = {
            '全部': 'all',
            '歌曲': 'song',
            '专辑': 'album',
            '歌手': 'singer',
            '歌词': 'lyric'
        }[v] || 'all',
        d = $.trim(k.val());

    if (d.length == 0) {
        alert('请输入查询关键字!');
        k.focus();
        return false;
    }

    obj.action = 'http://so.1ting.com/' + b + '.do';
    obj.target = '_blank';
    return true;
}

function ting() {
    var args = Array.prototype.slice.call(arguments);
    for(var i = 0, l = args.length; i < l; i++){
        (function(i){
            $('#' + args[i]+' .listAction a').each(function () {
                var m = $(this).attr('class'),
                    s = '#' + args[i]+' ul[data-selected] input:checkbox';
                if (m == 'add') {
                    $(this).mousedown(function () {
                        fns.add(s);
                    }).mouseup(function () {
                        fns.addlist(s);
                    }).click(function(){
                        return false;
                    });
                } else {
                    $(this).click(function () {
                        fns[m](s);
                        return false;
                    })
                }
            });
        })(i)
    }
}

function search_type() {
    var title = $("#search_title"), cont = $("#search_cont");
    title.click(function() {
        cont.show();
        cont.children().removeClass()
        .eq( $(this).attr("check-current") ).addClass("current");
    });
    cont.click(function(e) {
        var sor = $(e.target);
        $(this).hide();
        title.attr("check-current", sor.attr("check-num"))
        .children("p").text( sor.text() );
    });
}

function search_tips() {
    var placeholder = "支持拼音搜索，如找佛乐输入fy即可";
    $('#sq').suggest('http://so.1ting.com/api/suggest/json?callback=?', {
        onSelect: function() {
            $(this).parents('form').append('<input name="s" value="1" type="hidden"/>').submit();
        }
    }).css({outline:'0', color:'#ccc'}).attr('title', placeholder).val(placeholder);
}

function play(options) {
    /*
    $('.box-lrc-action a').toggle(function(){
        $(this).addClass('lrc-show').text('隐藏歌词');
        $('.lrcbox').css('visibility', 'visible');
    },function(){
        $(this).removeClass('lrc-show').text('显示歌词');
        $('.lrcbox').css('visibility', 'hidden');
    });
    */
    g_lyric.display($('#lrc').html());
    $(function(){
        $('.scroll-pane').jScrollPane();
    });

    yplayer.hook('before', function () {
    }).hook('timer,init', function () {
        var a = this, b = Math.floor(a.position()/a.duration() * 100);
        $('#time').html(a.position(true));
        $('#duration').html(a.duration(true));
        $('#progress').width(b + '%');
    }).hook('toggle', function () {
        try {
            var c = document.getElementById('btn-play');
            c.className = c.className === 'status-play' ? 'status-pause' : 'status-play';
        } catch (e) {}
    }).create(options.url);
    $('#btn-play').click(function(){
        yplayer.toggle(this);
        return false;
    });
    $('#play-down').click(function(){
        if (lightBox) {
            lightBox.open({
                url: 'http://my.1ting.com/download/song/?' + options.id,
                width: 370,
                height: 290,
                title: "下载歌曲"
            });
        }
        return false;
    });
    $('#play-fav').click(function(){
        if (lightBox) {
            lightBox.open({
                url: 'http://my.1ting.com/ajax/fav_compatible.php?t=1&v=2010&rID=' + options.id,
                width: 380,
                height: 250,
                title: "收藏歌曲"
            });
        }
        return false;
    });
}