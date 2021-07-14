/*禁止iframe*/
/*try{
    if(top.location.hostname.indexOf('1ting.com') === -1){}
}catch(e){
    top.location.replace(self.location.href);     
     }
*/

(function(){
    var q = [] ,c = {};
    q.push(['qq',
	        'http://shuqian.qq.com/post?from=3&title=%title%&uri=%uri%&jumpback=2&noui=1',
	        'favit',
	        'width=930,height=470,left=50,top=50,'
	        + 'toolbar=no,menubar=no,location=no,'
	        + 'scrollbars=yes,status=yes,resizable=yes']);

    q.push(['baidu',
	        'http://tieba.baidu.com/i/sys/share?title=%title%%E7%9C%9F%E5%A5%BD%E5%90%AC%E5%95%8A%2C%E5%BF%AB%E5%8E%BB%E5%90%AC%E4%B8%80%E5%90%AC&link=%uri%&type=text',
	        '_blank',
	        'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes']);

    q.push(['renren',
	        'http://share.xiaonei.com/share/buttonshare.do?link=%uri%&title=%title%',
	        'xnshare',
	        'toolbar=0,status=0,resizable=1,width=626,height=436']);

    q.push(['kaixin','http://www.kaixin001.com/repaste/share.php?rurl=%uri%&rtitle=%title%&rcontent=%E7%9C%9F%E5%A5%BD%E5%90%AC%E5%95%8A%2C%E5%BF%AB%E5%8E%BB%E5%90%AC%E4%B8%80%E5%90%AC']);

    q.push(['douban',
	        'http://www.douban.com/recommend/?url=%uri%&title=%title%&sel=%title%&v=1',
	        'douban',
	        'toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330']);
/*
    q.push(['sina',
	        'http://v.t.sina.com.cn/share/share.php?c=spr_web_sq_1ting_weibo'
	        + '&url=%uri%&title=%title%'
	        + '&sourceUrl=http%3A%2F%2Fwww.1ting.com%2F'
	        + '&content=utf8&pic=%img%']);
*/
    q.push(['sina',
				'http://v.t.sina.com.cn/share/share.php?appkey=1435846576'
				+'&url=%uri%&title='+encodeURIComponent('推荐歌曲:#')+'%title%%23'+encodeURIComponent('(via @一听音乐网)')+'&source=&sourceUrl=&content=utf-8&pic=%img%']);
    q.push(['delicious',
	        'http://del.icio.us/post?url=%uri%&title=%title%']);

    q.push(['myspace',
	        'http://www.myspace.cn/Modules/PostTo/Pages/DefaultMblog.aspx?t=%title%&u=%uri%']);
	            
    q.push(['tsohu',
	        'http://t.sohu.com/third/post.jsp?link=%uri%&tip=%title%','sohushare',
	        'toolbar=0,status=0,resizable=1,width=660,height=470,left='+((screen.width-660)/2)+',top='+((screen.height-470)/2)
	        ]);	  
	              
    q.push(['qzone',
	        'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=%uri%','qzone'	        
	        ]);	   

    q.push(['tqq',
	        'http://v.t.qq.com/share/share.php?title='+encodeURIComponent('推荐一首歌曲：')+'%title%&url=%uri%'+encodeURIComponent(' via @music_1ting')+'&appkey=fe86c3b4db4d4efeb802bf783b883d17&site='+encodeURIComponent('1ting.com')+'&pic=%img%','tqq'
	        ]);	   
	        
    q.push(['t163',
	        'http://t.163.com/article/user/checkLogin.do?link=http://www.1ting.com/&source='
	        + encodeURIComponent('一听音乐')+'&info=%title% %uri%',
	        'newwindow',
	        'height=330,width=550,top='+((screen.height-280)/2
				)+',left='+((screen.width-550)/2)+', toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no']);   
	        
    for(var i = 0,l = q.length;i<l;i++){
	    c[q[i][0]] = q[i].slice(1);
    }

    window.yiting = window.yiting || {};
    yiting.etc = yiting.etc || {};
    yiting.etc.share = function(n , f){
	    if(n in c){
	        f.apply({},c[n]);
	    }
	    return false;
    };
})();
(function(){
    var s = document.referrer.replace(/\+site\%3Awww\.1ting\.com/gi, '');
    if(s.match(/^http:\/\/(www\.)?(baidu|yahoo|google|sogou)/gi)){
        (function(el,cb){
            if (el.addEventListener){
                el.addEventListener('unload', cb, false);
            }else if (el.attachEvent){
                el.attachEvent('onunload', cb);
            }
        })(window,function(){
            var title = '一听音乐网';
            var url = "http://www.1ting.com/?bookmark";
            if (window.sidebar) {
                window.sidebar.addPanel(title, url, "");
            } else if (window.external) {
                window.external.AddFavorite(url, title);
            } else if (window.opera && window.print) {
                return true;
            }
        });
    }
})();
$(function(){
	$('#jringsubmit').click(function(){
		var mn=$('#mobilenNmber').val();
        if(mn.length != 11 || isNaN(mn)){
            alert("您输入的手机号码有误，请重新输入！");
            $('#mobilenNmber').focus();
            return false;
        }
        if(mn.substring(0,2) != "13" && mn.substring(0,2) != "15" && mn.substring(0,2) != "18" && mn.substring(0,2) != "14"){
            alert("您输入的手机号码有误，请重新输入！");
            $('#mobilenNmber').focus();
            return false;
        }
		window.open("http://www.ai-ring.cn/common/singleshow/code.jsp?mobileId="+mn+"&resUrl=&webownerId=24928&serviceId=100001&id=&songname="+encodeURIComponent($('#ring-song-name').val())+"&codetype=1&goPage=8&childid=10000&siteurl=http://www.1ting.com&adcodeid=100001",'_blank');
	});
});