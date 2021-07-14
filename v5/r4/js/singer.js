$(function(){
    //星标功能
    $(".singerInfo .act_grade p.stars").live('mouseover',function(){
        $(this).children(".rating").hide();
    }).live('mouseout',function(){
        $(this).children(".rating").show();
    }).find('a').live('click',function(){
        var score = $(this).attr('_star');
        var rate  = $(this).blur().siblings('.rating');
        rate.css('width',score*16+'px');
        setRating(rate.attr('_singerID'),'singer',score);
    });
    if(window.store && window.store.get){
        var fav = store.get('fav')||[], id = location.pathname.match(/_(\d+).html$/)[1];
        if($.inArray('s.'+id, fav)>-1){
            $('#rsp').html('你已评价').show();
        }
    }
});
$(function(){
    var handler, elem = $('.pageTitle').css({background:'#fff'}), top = elem.offset().top;
    $(window).bind('scroll resize',function(){
        clearTimeout(handler);
        handler = setTimeout(function(){
            elem.css({top:Math.max(0 ,$(document).scrollTop()-top)})
        }, 60);
    });
});
