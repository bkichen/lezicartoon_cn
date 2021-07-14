(function(a) {
    a.suggest = function(n, f) {
        var c = a(n).attr("autocomplete", "off");
        var e = a(document.createElement("ul"));
        var m = false;
        var d = 0;
        var p = [];
        var o = 0;
        $('body').append(e.addClass(f.resultsClass));
        i();
        a(window).load(i).resize(i);
        c.blur(function() {
            if($.trim(c.val())==''){
                c.css('color', '#ccc').val(c.attr('title'));
            }
            setTimeout(function() {
                e.hide()
            }, 200)
        }).keyup(l).focus(function() {
            if($.trim(c.val())==c.attr('title')){
                c.css('color', '#000').val('');
            }
            if (p.length > 0 && !e.is(":visible")) {
                e.show();
            }
        });

        function i() {
            var u = c.offset();
            e.css({
                top: (u.top + n.offsetHeight + 2) + "px",
                left: u.left + "px",
                width:c.width()+'px'
            })
        }

        function l(u) {
            if ((/27$|38$|40$/.test(u.keyCode) && e.is(":visible")) || (/^13$|^9$/.test(u.keyCode) && s())) {
                if (u.preventDefault) {
                    u.preventDefault()
                }
                if (u.stopPropagation) {
                    u.stopPropagation()
                }
                u.cancelBubble = true;
                u.returnValue = false;
                switch (u.keyCode) {
                case 38:
                    j();
                    break;
                case 40:
                    r();
                    break;
                case 9:
                case 13:
                    q();
                    break;
                case 27:
                    e.hide();
                    break
                }
            } else {
                if (c.val().length != d) {
                    if (m) {
                        clearTimeout(m)
                    }
                    m = setTimeout(k, f.delay);
                    d = c.val().length;
                    userInput = c.val();
                }
            }
        }

        function k() {
            var u = a.trim(c.val());
            if (u.length >= f.minchars) {
                cached = t(u);
                if (cached) {
                    h(cached.items)
                } else {
                    a.getJSON(f.source, {
                        q: u
                    }, function(v) {
                        e.hide();
                        var c=v['terms'],v='';
                        for (var i=0,l=c.length; i<l; i++){
                            v += c[i].name+'\t'+c[i].number+'\t'+c[i].type+'\n';
                        }
                        var w = b(v, u);
                        h(w);
                        g(u, w, v.length);
                    })
                }
            } else {
                e.hide();
            }
        }

        function t(v) {
            for (var u = 0; u < p.length; u++) {
                if (p[u]["q"] == v) {
                    p.unshift(p.splice(u, 1)[0]);
                    return p[0];
                }
            }
            return false;
        }

        function g(x, u, v) {
            while (p.length && (o + v > f.maxCacheSize)) {
                var w = p.pop();
                o -= w.size;
            }
            p.push({
                q: x,
                size: v,
                items: u
            });
            o += v;
        }

        function h(u) {
            if (!u) {
                return;
            }
            if (!u.length) {
                e.hide();
                return;
            }
            var w = "",
                t = ['', 'singer', 'album', 'song'],
                l = u.length;
            for (var v = 0; v < l; v++) {
                d = u[v].split('\t');
                w += '<li title="(' + d[1] + ')个结果" class="type_' + (t[d[2]]) + '"><a href="#">' + d[0] + '</a></li>';
            }
            e.html(w).show();
            e.children("li").mouseover(function() {
                e.children("li").removeClass(f.selectClass);
                a(this).addClass(f.selectClass)
            }).click(function(x) {
                x.preventDefault();
                x.stopPropagation();
                q();
            })
        }

        function b(u, y) {
            var v = [];
            var z = u.split(f.delimiter);
            for (var x = 0; x < z.length; x++) {
                var w = a.trim(z[x]);
                if (w) {
                    w = w.replace(new RegExp(y, "i"), function(A) {
                        return '<span class="' + f.matchClass + '">' + A + "</span>"
                    });
                    v[v.length] = w;
                }
            }
            return v;
        }

        function s() {
            if (!e.is(":visible")) {
                return false;
            }
            var u = e.children("li." + f.selectClass);
            if (!u.length) {
                u = false;
            }
            return u;
        }

        function q() {
            $currentResult = s();
            if ($currentResult) {
                c.val($currentResult.find('a').text());
                e.hide();
                if (f.onSelect) {
                    f.onSelect.apply(c[0]);
                }
            }
        }

        function r() {
            $currentResult = s();
            if ($currentResult) {
                $currentResult.removeClass(f.selectClass).next().addClass(f.selectClass);
                c.val($currentResult.next().find('a').text() || userInput)
            } else {
                e.children("li:first-child").addClass(f.selectClass);
                c.val(e.children("li:first-child").find('a').text())
            }
        }

        function j() {
            $currentResult = s();
            if ($currentResult) {
                $currentResult.removeClass(f.selectClass).prev().addClass(f.selectClass);
                c.val($currentResult.prev().find('a').text() || userInput)
            } else {
                e.children("li:last-child").addClass(f.selectClass);
                c.val(e.children("li:last-child").find('a').text())
            }
        }
    };
    a.fn.suggest = function(c, b) {
        if (!c) {
            return
        }
        b = b || {};
        b.source = c;
        b.delay = b.delay || 100;
        b.resultsClass = b.resultsClass || "ac_results";
        b.selectClass = b.selectClass || "ac_over";
        b.matchClass = b.matchClass || "ac_match";
        b.minchars = b.minchars || 1;
        b.delimiter = b.delimiter || "\n";
        b.onSelect = b.onSelect || false;
        b.maxCacheSize = b.maxCacheSize || 65536;
        this.each(function() {
            new a.suggest(this, b)
        });
        return this
    }
})($);
(function(){
    var placeholder = "支持拼音搜索，如找邓丽君输入dlj即可";
    $('#sq').suggest('//so.1ting.com/api/suggest/json?callback=?', {
        onSelect: function() {
            $(this).parents('form').append('<input name="s" value="1" type="hidden"/>').submit();
        }
    }).css({outline:'0', color:'#ccc'}).attr('title', placeholder).val(placeholder);
})();

var a_idx = 0;
 
    $("body").click(function(e) {
        var a = new Array(
            "富强", "民主", "文明", "和谐",
            "自由", "平等", "公正", "法治",
            "爱国", "敬业", "诚信", "友善"
            );
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
        y = e.pageY;
        $i.css({
            "z-index": 144469,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#f00"
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
        1500,
        function() {
            $i.remove()
        })
    });