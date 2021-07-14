(function(){
    var d=document,ns = d.getElementsByTagName('script'), prev = ns[ns.length-1],root=prev.parentNode, s;
    s = root.insertBefore(d.createElement('script'), prev);
    s.async=true;
    s.setAttribute('id', 'bdshare_js');
    s.setAttribute('data', 'type=tools&amp;mini=1&amp;uid=14170');

    s = root.insertBefore(d.createElement('script'), prev);
    s.setAttribute('id', 'bdshell_js');
    s.async = true;
    s.src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();

    window.bds_config = {
        //'wbUid':1671108633,
        'bdDesc':'推荐 '+$YP.get('singer-name')+' 的《'+$YP.get('song-name')+'》 分享自@一听音乐网 ',
        'snsKey':{'tqq':'403a778463634ece8f0c75a66c4e230d', 'tsina':'1435846576'},
        'bdPopTitle':'分享一听音乐网'
    };

    var conf_bds = function (){
        var c = {
            url:'http://www.1ting.com'+$YP.get('song-url'),
            pic:$YP.get('album-cover'),
            text:'@'+$YP.get('singer-name')+' 《'+$YP.get('song-name')+'》 分享自@一听音乐网 '
        }, a = [], e = function(s){
            return s.replace(/[\r\n\'\"]/g, function(m, c, o){
                return '&#'+m.charCodeAt(0)+';';
            });
        };
        try{
            for (var k in c){ a.push("'"+k+"':'" + e(c[k]) + "'");}
            a = '{'+a.join(',') + '}';
            var tries=5,tid=setInterval(function(){
                var g = document.getElementById('bdshare');
                if(g){
                    g.setAttribute('data', a);
                    clearInterval(tid);
                }
                if(!--tries){
                    clearInterval(tid);
                }
            }, 1000);
        }catch(e){
        }
    };

    if(window.$YP && $YP.get){
        window.bds_config['bdPic'] = $YP.get('album-cover');
        setTimeout(function(){
            conf_bds();
            $YP.hook('play', conf_bds);
        }, 200);
    }
})();
