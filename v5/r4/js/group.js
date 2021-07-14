$(function(){
    var handler, sTop , offset = $("#singerIndex").css({background:'#fff'}).offset().top;
    $(window).bind('scroll',function(){
        window.clearTimeout(handler);
        handler = window.setTimeout(function(){
            sTop = $(document).scrollTop();
            $("#singerIndex").css(sTop > offset
                ?{top:sTop-offset, position:'relative'}
                :{top:0, position:''});
        }, 60);
    });

    $("#onlyshowhot").attr('checked','').blur();

    var goDiv = $("#go_top"),
        contentWidth = $("div.header").innerWidth();

    goDiv.click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 200);
    });

    $(window).resize(function() {
        setPosition();
        setDisplay();
    })
    .scroll(function() {
        setDisplay();
        if ( !window.XMLHttpRequest ) {
            setPosition();
        }
    });

    function setPosition() {
        var clientWidth = document.documentElement.clientWidth,
            clientHeight = document.documentElement.clientHeight;
        if ( window.XMLHttpRequest ) {
            goDiv.css({
                left: contentWidth+(clientWidth-contentWidth)/2+"px",
                top: clientHeight - 100 + "px"
            });
        } else {
            goDiv.css({
                position: "absolute",
                left: contentWidth+(clientWidth-contentWidth)/2+"px",
                top: clientHeight - 100 + $(window).scrollTop() + "px"
            });
        }
    }
    function setDisplay() {
        var scrollTop = $(window).scrollTop(),
            clientHeight = document.documentElement.clientHeight;
        if ( scrollTop > clientHeight ) {
            goDiv.show();
        } else {
            goDiv.hide();
        }
    }
    setPosition();
    setDisplay();
});

function showhot()
{
    $(".singerList .allSinger").each(function(){
        hotLi = $(this).children("li.hot");
        hotUl = $('<ul class="hotSinger" />');
        $(this).after(hotUl.hide());
        if($(this).children("li").length)
        {
            if(hotLi.length) hotLi.clone().appendTo($(this).next('.hotSinger'));
            else hotUl.append('<li class="nohot">本类暂无热门歌手</li>');
        }
        else
        {
            $(this).append('<li class="nohot">本类暂无歌手</li>');
            hotUl.append('<li class="nohot">本类暂无热门歌手</li>');
        }
    });

    $("#onlyshowhot").click(function()
    {
        selected = $(this).attr('checked');
        if(selected)
        {
            $(".singerList .allSinger").hide();
            $(".singerList .hotSinger").show();
        }
        else
        {
            $(".singerList .allSinger").show();
            $(".singerList .hotSinger").hide();
        }
        $(window).scroll();
    });
}

