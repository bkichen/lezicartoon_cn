jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = '';
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

var Album = (function($){
	function album(o){
		this.int(o)
	};
	album.prototype = {
		int: function(o){
			var that = this;
			this.aImg = $(o).find('img');
			this._css = null;
			this.iLoad = 0;
			this.zoom = 1.5;
			this.i=0;
			this.ok = false;
			this.aEm = $('em',$(o));
			this.tLayer = null;
			this.aImg.each(function(){
				$(this).load(function(){
					that.iLoad++;
					if(that.iLoad==that.aImg.length&&!that.ok){
						that.pos(o);
					}
				})
			});
			setTimeout(function(){
				if(!that.ok){that.pos(o);}
			},100);
		},
		pos:function(o){
			var that = this;
			that.ok = true;
			$('a',$(o)).each(function(){
				var oP = $(this).parent();
				var oS = $(this).siblings('.Album_info');
				oP.css({'width':$('img',this).width(),'height':$('img',this).height()})
				$(this).css({'top':oP.position().top,'left':oP.position().left});
				$('em',this).css({'height':oP.height(),'filter': 'alpha(opacity=50)'});
				if($(o).width()-oP.position().left>=$(this).width()*6){
					oS.css({'height':Math.round($(this).height()*that.zoom)+4,'left':oP.position().left-2,'right':'auto','padding-left':Math.round($(this).width()*that.zoom)})
				}else{
					oS.css({'height':$(this).height()*that.zoom+4,'right':$(o).width()-oP.position().left-$(this).width()-2,'left':'auto','padding-right':Math.round($(this).width()*that.zoom),'text-align':'right'})
				}
				if(oP.position().top>=Math.round($(this).height()*(that.zoom-1)/2)&&$(o).height()-oP.position().top-$(this).height()>=Math.round($(this).height()*(that.zoom-1)/2)){
					oS.css('top',oP.position().top-Math.round($(this).height()*(that.zoom-1)/2)-2)
				}else if(oP.position().top<Math.round($(this).height()*(that.zoom-1)/2)){
					oS.css('top',$(this).parent().position().top-2)
				}else{
					oS.css('top',$(this).parent().position().top-Math.round($(this).height()*(that.zoom-1)+2))
				}
			});
			this.showImg(o)
		},
		showImg: function(o){
			var that = this;
			$('li',$(o)).each(function(){
				$('a',this).css({'visibility':'visible','display':'none'}).fadeIn(1000);
			})
			setTimeout(function(){
				$(o).css({'background':'none'});
				that.hover(o);
			},1000)			
		},
		hover: function(o){
			var that = this;
			$('a',$(o)).hover(function(){
				var oP = $(this).parent();
				var oS = $(this).siblings('.Album_info');
				$('em',this).hide();
				if(that.tLayer){clearTimeout(that.tLayer);that.tLayer = null}
				that.aEm.not($('em',this)).each(function(){
					if(!$(this).is(':visible')){
						$(this).fadeIn(200)
					}
				});
				oS.show().animate({width:$(this).width()*6-Math.round($(this).width()*that.zoom)+7},300);
				that._css = {'top':oP.position().top,'z-index':$(this).css('z-index'),'width':$(this).width(),'height':$(this).height(),'left':$(this).css('left'),'right':$(this).css('right')};
				if($(o).width()-oP.position().left>=$(this).width()*6){
					$(this).css({'right':'auto','left':parseInt(oS.css('left'))+2})		
				}else{
					$(this).css({'right':parseInt(oS.css('right'))+2,'left':'auto'})	
				}
				$(this).css({'top':parseInt(oS.css('top'))+2,'width':$(this).width()*that.zoom,'height':$(this).height()*that.zoom,'z-index':$(this).css('z-index')+100})	
				$(this).children('img').css({'width':$(this).width(),'height':$(this).height()})
				
			},function(){
				$('.Album_info').hide().css({'width':'auto'}).stop();
				$(this).css(that._css);
				$(this).children('img').css({'width':that._css.width,'height':that._css.height})
				that.tLayer = setTimeout(function(){
					that.aEm.fadeOut(200)	
				},200)
			})
		}	
	}
	return {
		set: function(o){
			new album(o)
		}
	}
})(jQuery);

(function($) {
    $.fn.lazyload = function(options) {
        var settings = {
            threshold    : 0,
            failurelimit : 0,
            event        : "scroll",
            effect       : "show",
            container    : window
        };                
        if(options) {
            $.extend(settings, options);
        }
        var elements = this;
        if ("scroll" == settings.event) {
            $(settings.container).bind("scroll", function(event) {                
                var counter = 0;
                elements.each(function() {
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                            $(this).trigger("appear");
                    } else {
                        if (counter++ > settings.failurelimit) {
                            return false;
                        }
                    }
                });
                var temp = $.grep(elements, function(element) {
                    return !element.loaded;
                });
                elements = $(temp);
            });
        }        
        this.each(function() {
            var self = this;
            if (undefined == $(self).attr("original")) {
                $(self).attr("original", $(self).attr("src"));
            }
            if ("scroll" != settings.event || 
                    undefined == $(self).attr("src") || 
                    settings.placeholder == $(self).attr("src") || 
                    ($.abovethetop(self, settings) ||
                     $.leftofbegin(self, settings) || 
                     $.belowthefold(self, settings) || 
                     $.rightoffold(self, settings) )) {                        
                if (settings.placeholder) {
                    $(self).attr("src", settings.placeholder);      
                } else {
                    $(self).removeAttr("src");
                }
                self.loaded = false;
            } else {
                self.loaded = true;
            }
            $(self).one("appear", function() {
                if (!this.loaded) {
                    $("<img />")
                        .bind("load", function() {
                            $(self)
                                .hide()
                                .attr("src", $(self).attr("original"))
                                [settings.effect](settings.effectspeed);
                            self.loaded = true;
                        })
                        .attr("src", $(self).attr("original"));
                };
            });
            if ("scroll" != settings.event) {
                $(self).bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                });
            }
        });
        $(settings.container).trigger(settings.event);        
        return this;
    };
    $.belowthefold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };    
    $.rightoffold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };        
    $.abovethetop = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };    
    $.leftofbegin = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    $.extend($.expr[':'], {
        "below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold"  : "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold"   : "!$.rightoffold(a, {threshold : 0, container: window})"
    });    
})(jQuery);

$(document).ready(function() {
    $(".j-input").on("focus",".j-txt",function(){
        $(this).parent().addClass("active");
        $(this).parent().find("label").hide();
    }).on("blur",".j-txt",function(){
        $(this).parent().removeClass("active");
        $(this).val() || $(this).parent().find("label").show();
    });
    $(window).scroll(function(){
        $("#j-scrollBtn").toggleClass("show",$(this).scrollTop()>0);
    });
    $("#j-scrollBtn").on("click",function(){window.scroll(0,0)});
});

function played(id) {
    player_style();

    var n = 0, max = 49, ids = [parseInt(id)], played = $.cookie('mv_played').split(',');
    for (var i in played) {
        if (n < max && id != played[i] && parseInt(played[i]) > 0) {
            n++;
            ids.push(played[i]);
        }
    }
    var path = '/';
    if(location.pathname.indexOf('/mv/')>=0){
        path = '/mv/';
    }
    $.cookie('mv_played', ids.join(','), {expires: 365, path: path});

    $.getJSON(path+'video/played/'+id);
}

var thread;
function player_style() {
    $('#player').append('<style>.ps{position:absolute;z-index:999;color:#fff;background:#232323;}</style><div class="ps search" style="top:0px;left:0px;width:850px;height:32px;background:#000;"></div><div class="ps" style="top:10px;left:700px;width:150px;height:35px;z-index:9999;background:transparent;"><a href="http://www.1ting.com/mv" target="_blank"><img src="/mv/player/logo.png" width="90%"></a></div><div class="ps share" style="top:32px;left:790px;width:60px;height:368px;background:transparent;"></div><div class="ps" style="top:415px;left:610px;width:105px;height:35px;"></div><div class="ps" style="top:415px;left:788px;width:62px;height:35px;background:transparent;"></div>').mouseover(function(){
    $(this).find('.search,.share').show();
    }).mouseleave(function(){
        clearTimeout(thread);
        thread = setTimeout(function(){
            $(this).find('.search,.share').hide();
        }, 1000);
    });
    setTimeout(function(){
        //$('#player .share').css('background', '#000');
    }, 2000);
    setTimeout(function(){
        $('#player .search').hide();
    }, 15000);
}

function player(file, page, pic, swf) {
    var html_play = ' 自动播放推荐视频 <span class="f-icon"></span>';
    var html_repeat = ' 重复播放 <span class="f-icon"></span>';
    var html_quality = ' 高清 <span class="f-icon"></span>';
    if (/video\/hd\//.test(location.href)) {
    	$('#playquality').html(html_quality).attr('href', location.href.replace(/video\/hd\//, 'video/sd/'));
    }
    if (location.hash.indexOf('repeat') != -1) {
        $('#playstatus').html(html_repeat);
    }
    if (document.referrer.indexOf('/mv/video/') != -1 && document.referrer.replace(/\/(.*)\//, '') != location.href.replace(/\/(.*)\//, '')) {
        $('#playstate').append('<a href="javascript:history.go(-1);" class="btn v-icon"> 播放上一个视频 </a>');
    }
    $('#playstatus').toggle(function(){
        location.hash = 'repeat';
        $(this).html(html_repeat);
    }, function(){
        location.hash = '';
        $(this).html(html_play);
    });
    var video=[file+'.mp4->video/mp4',file+'.webm->video/webm',file+'.ogg->video/ogg'];
    var flashvars={loaded:'loadedHandler',f:file+'.flv',c:0,b:0,p:1,e:1,my_url:'http://www.1ting.com'+page,my_pic:'http://www.1ting.com'+pic};
    var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
    CKobject.embed(swf,'player','ckplayer_player','850','450',false,flashvars,video,params);
    if (CKobject.Flash()['f']) {
        CKobject.embedSWF(swf,'player','ckplayer_player','850','450',flashvars,params);
    } else if (CKobject.isHTML5()) {
        CKobject.embedHTML5('player','ckplayer_player',850,450,video,flashvars,['all']);
    } else {
        $('#player')
        .css({'color':'red', 'font-size':'22px'})
        .html('浏览器没有安装FLASH插件或者不支持HTML5，无法播放视频！');
    }
}

function loadedHandler() {
    var player = CKobject.getObjectById('ckplayer_player');
    if (player.getType()) {
        player.addListener('ended',player_stop);
    } else {
        player.addListener('ended','player_stop');
    }
}

function player_pause() {
    CKobject.getObjectById('ckplayer_player').videoPause();
}

function player_stop() {
    if (location.hash.indexOf('repeat') == -1) {
        $list = $('.j-mainslide-tabcon').eq(0).find('.list a');
        $id = Math.floor(Math.random() * $list.size());
        if ($id) {
                var url = $list.eq($id).attr('href');
                if ($('#playquality').text().indexOf('高清') != -1) {
                    url = url.replace(/video\/(\w{2})\//, 'video/hd/');
                }
            location.href = url;
        }
    } else {
        location.reload();
    }
}

// www.yinyuetai.com player.events
function yytVideoComplete() {
    player_stop();
}

// music.iqiyi.com player.events
window.notice = function() {
    var events = jQuery.parseJSON(arguments[0]);
    switch (events.data.state) {
        case 'Ready': // 准备播放正片
        break;

        case 'StartPlay': //  开始播放
        break;

        case 'Paused': //  暂停状态
        break;

        case 'Playing': //  播放状态
        break;

        case 'Stoped': //  停止状态
            player_stop();
        break;

        case 'Error': //  发生错误
            player_stop();
        break;
    }
};