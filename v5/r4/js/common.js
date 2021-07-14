document.domain = '1ting.com';
window.getJSON = $.getJSON;

if(/(iPad|iPhone|iTouch|iPod|IEMobile|Android)/i.test(navigator.userAgent)){
    var a = location.pathname,
        b = 'http://h5.1ting.com/',
        c = /^\/(singer|album)\/[a-z0-9]{2}\/(singer|album)_(\d+).html/i,
        c = a.match(c), d = c ? '#/' + c.slice(2).join('/') : '';
    location.replace(b + d);
}

window.Dict = new function(){
    var g = {};
    this.get = function(k){
        return g['_' + k];
    };
    this.set = function(k, v){
       g['_' + k] = v;
    }
};


window.callback_play_list = function (a) {
    Dict.set('called', a);
};

function setRating(id, type, score) {
    if(window.store && window.store.get){
        var fav = store.get('fav')||[];
        if($.inArray((type==='singer' ? 's.' : 'a.')+id, fav) >= 0){
            $('#rsp').html('你已评价').show();
            return;
        }
    }

    $.getJSON('//tracker.1ting.com/api/rate/'+type+'?id=' + id + '&rate=' + score + '&callback=?', function (data) {
        if (data.error == 0) {
            $('#rating_count'+id).text(parseInt($('#rating_count'+id).text(), 10) + 1);
        }
        $('#rsp').html('你已评价').show();
        if(window.store && window.store.get){
            var fav = store.get('fav')||[];
            fav.push((type==='singer'?'s.':'a.'));
            store.set('fav', $.unique(fav));
        }
    });
}

function getView(id, type) {
    $.getJSON('//tracker.1ting.com/api/report/' + type + '?cat=view&id=' + id + '&callback=?', function (data) {
        $('#Popularity').text(data['results']);
    });
}

function getRating(id, type) {
    var score = 0,count = 0;
    $.getJSON('//tracker.1ting.com/api/report/' + type + '?cat=rate&id=' + id + '&callback=?', function (data) {
        $.each(data['results'], function (i, item) {
            score += parseInt(i * item);
            count += parseInt(item);
        });
        count = count || 1;
        var ave = parseInt((score / count) * 10) / 10 || 3;
        var rating = parseInt(ave * 2) * 8;
        $('#rating' + id).css('width', rating + 'px');
        $('#rating_count'+id).text(count);
        $('#rating_ave'+id).text(ave);
    });
}

function getFavs(id, type) {
    $.getJSON('//my.1ting.com/service/fav/'+type+'/' + id + '?callback=?', function (data) {
        $('#favsCount').html(data.response + '人收藏');
    });
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
    obj.action = '//so.1ting.com/' + b + '.do';
    obj.target = '_blank';
    return true;
};

window.kookie = {
    set: function (name, value, hours) {
        var expire = '';
        if (hours != null) {
            expire = new Date((new Date()).getTime() + hours * 3600000);
            expire = '; expires=' + expire.toGMTString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;domain;' + expire;
    },

    get: function (name) {
        var d = document;
        var v = '';
        var s = name + '=',
            c = d.cookie,
            l = c.length;
        if (l > 0) {
            var os = c.indexOf(s);
            if (os != -1) {
                os += s.length;
                var ed = c.indexOf(';', os);
                if (ed == -1) ed = l;
                v = decodeURIComponent(c.substring(os, ed));
            }
        }
        return v;
    }
};


window.fns = {
    selector: '#song-list input[name=checked]',
    select: function (selector, o) {
        if (typeof selector !== 'string') {
            selector = fns.selector;
        }
        $(selector).each(function () {
            this.checked = !this.checked;
        });
    },
    play: function (s, o) {
        var vs = fns['check'](s);
        vs.length > 0 ? window.open('/p_' + vs.join('_') + '.html', '_1ting') : alert('请选择歌曲！');
    },
    fav: function (s) {
        var vs = fns['check'](s);
        vs.length > 0 ? window.tobox('//my.1ting.com/service/addToFavorite.jsp?t=1&rID=' + vs.join(','), '_box') : alert('请选择歌曲！');
    },
    addlist: function (s, o) {
        if (!Dict.get('called')) {
            return false;
        }
        switch (Dict.get('called').constructor) {
        case Array:
            window.open(o ? '/album_' + o + '.html' : '/p_' + Dict.get('called').join('_') + '.html', '_1ting');
            break;
        case Boolean:
            alert('添加到列表!');
            break;
        case String:
            alert(Dict.get('called'));
            break;
        }
    },
    add: function (s, o) {
        var vs = o || fns['check'](s);
        if (vs.length > 0) {
            try {
                var fl = (function (n) {
                    if (document[n]) {
                        return document[n];
                    } else if (document.getElementById(n)) {
                        return document.getElementById(n);
                    } else {
                        return window[n];
                    }
                })('play_list_send');
                fl.add_to_play_list(vs);
            } catch (e) {
                Dict.set('called', e.message);
            }
        } else {
            Dict.set('called', '请选择歌曲！');
        }
    },
    check: function (selector) {
        var vs = [];
        if (typeof selector !== 'string') {
            selector = fns.selector;
        }
        $(selector).each(function () {
            if (this.checked) {
                vs.push(this.value);
            }
        });
        return vs;
    },
    playalbum: function (i) {
        try {
            fns.addlist(null, i);
        } catch (e) {}
    },
    addalbum: function () {
        try {
            var ids = [];
            $(fns.selector).each(function () {
                ids.push(this.value);
            });
            fns.add(null, ids);
        } catch (e) {}
    }
};


$(function () {
    if ($.browser.msie) {
        for (var j = 0, c = ['a', 'button']; j < c.length; j++) {
            for (var i = 0, a = document.getElementsByTagName(c[j]), l = a.length; i < l; i++) {
                a[i].setAttribute('hideFocus', 'true');
            }
        }
    }

    $('#search_option_selected a').click(function () {
        $('#search_option_list').toggle();
        $(this).blur();
    });

    $('#search_option_list li a').click(function () {
        $(this).blur().parent('li').addClass('selected').siblings('li.selected').removeClass('selected');
        $('#search_option_selected a').text($(this).text());
        $('#search_option_list').hide();
        $('.search_box input#search_keyword').focus();
    });

    $('#song-list .fav').each(function () {
        $(this).click(function () {
            lightBox.open({
                url: $(this).attr('href'),
                width: 370,
                height: 240,
                title: '收藏歌曲'
            });
            return false;
        });
    });
});
