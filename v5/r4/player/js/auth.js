(function(){
    var kookie = {
        set:function(name, value, hours) {
            var expire = "";
            if (hours != null) {
                expire = new Date((new Date()).getTime() + hours * 3600000);
                expire = "; expires=" + expire.toGMTString();
            }
            document.cookie = name + "=" + encodeURIComponent(value) + ";path=/;domain;" + expire;
        },

        get:function(name) {
            var d = document;
            var v = "";
            var s = name + "=",c=d.cookie,l=c.length;
            if (l > 0) {
                var os = c.indexOf(s);
                if (os != -1) {
                    os += s.length;
                    var ed = c.indexOf(";", os);
                    if (ed == -1) ed = l;
                    v = decodeURIComponent(c.substring(os, ed));
                }
            }
            return v;
        }
    };

    window.get_user_info=function(u,j){
        $('.content_wrap').before('<ul class="comment_login comment_uinfo"><li>'+u+
        '&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;<a href="http://my.1ting.com/message" target="_blank">短消息</a>&nbsp;&nbsp;<font color="#d0d0d0">|</font>&nbsp;&nbsp;<a href="http://my.1ting.com/site/'+j+'" target="_blank">我的空间</a>&nbsp;&nbsp;<font color="#d0d0d0">|</font>&nbsp;&nbsp;<a href="http://my.1ting.com/profile" target="_blank">更改资料</a>&nbsp;&nbsp;<font color="#d0d0d0">|</font>&nbsp;&nbsp;<a href="http://my.1ting.com/logout" onclick="onAuthLogout(this.href);return false;">退出</a>&nbsp;&nbsp;]&nbsp;&nbsp;[&nbsp;<a href="http://my.1ting.com/feedback?referer='+encodeURIComponent(parent.location.href)+'" target="_blank">意见箱</a>&nbsp;]</li></ul>');
    };

    window.authHtml=function(u){
       $('li.forlogin').remove();
       if (u && u.length > 2 ) {
            var user = kookie.get('OneNick')||kookie.get('OneUser');
            $('#index').after('<li class="forlogin"><a href="http://my.1ting.com/" target="_blank">' + user + '</a></li><li class="forlogin"><a href="http://my.1ting.com/profile" target="_blank">修改资料</a></li><li class="forlogin"><a href="http://my.1ting.com/logout" onclick="onAuthLogout(this.href);return false;">退出</a></li>');
            var commentsrc=$("#songcomment").attr("src");
            $('#songcomment').attr('src',commentsrc+'&t='+(new Date().getTime()));
       } else {
            $('#index').after('<li class="forlogin" id="reg"><a href="http://my.1ting.com/register" target="_blank">注册</a></li>' +
            '<li class="forlogin" id="login"><a href="http://my.1ting.com/login/lite" target="_box" onclick="lightBox.open({url:this.href,width:340,height:230,title:\'登录\'});return false;">登录</a></li>');
       }
    };

    window.onAuthLogin = function(a) {
        if(a!="box")lightBox.close();
        authHtml(kookie.get('OneId'));
    };

    window.closeDialog = function() {
        lightBox.close();
    }

    window.logoutCallback=function(u){

    }

    window.onAuthLogout=function(u){
        $('<script />').attr('src', u+'?jsonp=logoutCallback').appendTo($('head'));
        window.setTimeout(function(){authHtml()},1);
        return false;
    };
    authHtml(kookie.get('OneId'));
})($);
