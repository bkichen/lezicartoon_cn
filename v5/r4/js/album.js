$(function(){
    var qs = {};
    $("p.stars").live('mouseover',function(){
        $(this).children(".rating").hide();
    }).live('mouseout',function(){
        $(this).children(".rating").show();
    }).find('a').live('click',function(){
        var score = $(this).attr('_star');
        var rate  = $(this).blur().siblings('.rating');
        var type = rate.attr('_singerID') ? 'singer' : 'album';
        var id = rate.attr(type==='singer' ? '_singerID' : '_albumid');
        rate.css('width',score * 16+'px');
        if(console)console.log(id, type, score)
        setRating(id, type, score);
    }).children('span').each(function(){
        var type = $(this).attr('_singerID') ? 'singer' : 'album';
        qs[type] = $(this).attr(type === 'singer' ? '_singerID' : '_albumid');
    });
    if(window.store && window.store.get){
        var fav = store.get('fav')||[];
        if($.inArray('s.'+qs.singer, fav) >-1){
            $('#rsp').html('你已评价').show();
        }
    }
});
