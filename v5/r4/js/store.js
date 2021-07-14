/* Copyright (c) 2010-2012 Marcus Westin */
jQuery.extend({
    stringify  : function stringify(obj) {
        if ("JSON" in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';

            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v + '"';
                    } else if (t == "object" && v !== null){
                        v = jQuery.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }

            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});

(function() {
    function g() {
        try {
            return d in b && b[d]
        }
        catch (a) {
            return !1
        }
    }
    var a = {},
        b = window,
        c = b.document,
        d = "localStorage",
        e = "__storejs__",
        f;
    a.disabled = !1, a.set = function(a, b) {}, a.get = function(a) {}, a.remove = function(a) {}, a.clear = function() {}, a.transact = function(b, c, d) {
        var e = a.get(b);
        d == null && (d = c, c = null), typeof e == "undefined" && (e = c || {}), d(e), a.set(b, e)
    }, a.getAll = function() {}, a.serialize = function(a) {
        return jQuery.stringify(a)
    }, a.deserialize = function(a) {
        if (typeof a != "string") return undefined;
        try {
            if ("JSON" in window) {
                return JSON.parse(a);
            }
            return window.eval.apply(window, [a]);
        }
        catch (b) {
            return a || undefined
        }
    };
    if (g()) f = b[d], a.set = function(b, c) {
        return c === undefined ? a.remove(b) : (f.setItem(b, a.serialize(c)), c)
    }, a.get = function(b) {
        return a.deserialize(f.getItem(b))
    }, a.remove = function(a) {
        f.removeItem(a)
    }, a.clear = function() {
        f.clear()
    }, a.getAll = function() {
        var b = {};
        for (var c = 0; c < f.length; ++c) {
            var d = f.key(c);
            b[d] = a.get(d)
        }
        return b
    };
    else if (c.documentElement.addBehavior) {
        var h, i;
        try {
            i = new ActiveXObject("htmlfile"), i.open(), i.write('<script>document.w=window<\/script><iframe src="/favicon.ico"></frame>'), i.close(), h = i.w.frames[0].document, f = h.createElement("div")
        }
        catch (j) {
            f = c.createElement("div"), h = c.body
        }
        function k(b) {
            return function() {
                var c = Array.prototype.slice.call(arguments, 0);
                c.unshift(f), h.appendChild(f), f.addBehavior("#default#userData"), f.load(d);
                var e = b.apply(a, c);
                return h.removeChild(f), e
            }
        }
        var l = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");

        function m(a) {
            return a.replace(l, "___")
        }
        a.set = k(function(b, c, e) {
            return c = m(c), e === undefined ? a.remove(c) : (b.setAttribute(c, a.serialize(e)), b.save(d), e)
        }), a.get = k(function(b, c) {
            return c = m(c), a.deserialize(b.getAttribute(c))
        }), a.remove = k(function(a, b) {
            b = m(b), a.removeAttribute(b), a.save(d)
        }), a.clear = k(function(a) {
            var b = a.XMLDocument.documentElement.attributes;
            a.load(d);
            for (var c = 0, e; e = b[c]; c++) a.removeAttribute(e.name);
            a.save(d)
        }), a.getAll = k(function(b) {
            var c = b.XMLDocument.documentElement.attributes;
            b.load(d);
            var e = {};
            for (var f = 0, g; g = c[f]; ++f) e[g] = a.get(g);
            return e
        })
    }
    try {
        a.set(e, e), a.get(e) != e && (a.disabled = !0), a.remove(e)
    }
    catch (j) {
        a.disabled = !0
    }
    a.enabled = !a.disabled, typeof module != "undefined" && typeof module != "function" ? module.exports = a : typeof define == "function" && define.amd ? define(a) : this.store = a
})();
