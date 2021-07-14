var clipboard  = new function() {
    var a = this,swf='/v5/r4/player/js/clipboard.swf';
    a.hooks = {};
    a.id = 'ClipboardMovie';
    a.create = function(c){
        var $s = $('#'+c),
        d = $s.offset(),
        e=$s[0].offsetWidth,
        f=$s[0].offsetHeight,
        v=document.createElement('div');
        document.body.appendChild(v);
        window.setTimeout(function(){
        v.innerHTML = a.code(e,f);
        $('#'+a.id).css({
            'position':'absolute',
            'left':d.left+'px',
            'top':d.top+'px',
            'width':e+'px',
            'height':f+'px',
            'zIndex':999
        });
        },1);
    };

    a.client = function(){
        return navigator.userAgent.match(/MSIE/) ? document.getElementById(a.id) : document[a.id];
    };

    a.code = function(width, height){
        var flashvars= 'id=' + a.id + '&width=' + width + '&height=' + height;

		if (navigator.userAgent.match(/MSIE/)) {
            return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'" id="'+a.id+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+swf+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="transparent"/></object>';
		} else {
            return '<embed id="'+a.id+'" src="'+swf+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+a.id+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';
		}
    };

    a.dispatch = function(id, name, args){
        a.event.apply(a,[name,args]);
    };

    a.event = function(k,f){
        var q = k.split(',');
        for(t = 0;t<q.length;t++){
            k = q[t].toLowerCase().replace(/^on/,'');
            if (typeof f !== 'function'){
                if(typeof a.hooks[k] != 'undefined'){
                    for (var o = 0;o<a.hooks[k].length;o++){
                        a.hooks[k][o].apply(a,[f]);
                    }
                }
            }else{
                if (typeof f == 'function'){
                    typeof a.hooks[k] == 'object' ?
                        a.hooks[k].push(f) :
                        a.hooks[k] = [f];
                }
            }
        }
        return a;
    };
    a.setText = function(s){
        a.client().setText(s);
    };
};
