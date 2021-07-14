lightBox = {
	autohide : false,
	//打开窗口
	open : function(boxset){
		this.obj();

		//载入参数
		if(!boxset.url) return false;
		if(!boxset.width) boxset.width = 400;
		if(!boxset.height) boxset.height = 240;
		if(!boxset.title) boxset.title = 'POP Window';

		//载入地址
		boxframe.attr('src',boxset.url);

		//设置参数
		this.set(boxset);

		//显示窗口
		boxwindow.show();
		boxmask.show();

		//绑定事件
		boxmask.bind('click', function(){lightBox.hide()});
		boxwindow.find("a.close").bind('click', function(){lightBox.hide()});
		//$(window).bind('scroll',function(){boxwindow.css('margin-top',-boxwindow.height()/2+document.documentElement.scrollTop+'px')});
		if($.browser.msie && $.browser.version == '6.0') $("html").css("overflow", "hidden");
	},

	//获得对象
	obj : function(){
		boxwindow = $('#LB_window').length < 1 ?
			$('body').append('<dl id="LB_window"><dt><strong class="title"></strong><a href="javascript:void(0);" class="close">关闭</a></dt><dd><iframe id="LB_frame" frameborder="0"></iframe></dd></dl>')
			 : $('#LB_window');
		boxmask = $('.LB_mask').length < 1 ?
			 $('body').append('<div id="LB_background" class="LB_mask"></div><iframe id="LB_hideselect" class="LB_mask"></iframe>')
			 : $(".LB_mask");
		boxframe = $("#LB_window #LB_frame");
	},

	//设置参数
	set : function(boxset){
		this.obj();
		//标题
		if(boxset.title) boxwindow.find("dt strong.title").text(boxset.title);

		//地址
		if(boxset.url) boxframe.attr('src',boxset.url);

		//窗口参数
		if(parseInt(boxset.width) > 0)
			bw = parseInt(boxset.width)+2;
		else
			bw = boxwindow.width();

		if(parseInt(boxset.height) > 0)
			bh = parseInt(boxset.height)+28;
		else
			bh = boxwindow.height();

		bl = - parseInt(bw/2);
		bt = - parseInt(bh/2);

		if($.browser.msie && $.browser.version == '6.0') bt +=  document.documentElement.scrollTop;
		istimeout = parseInt(boxset.timeout) > 0 ? function(){lightBox.timeout(parseInt(boxset.timeout))} : function(){};
		//应用参数
		if(boxwindow.css('display') == 'block')
		{
			//窗口已打开使用动画效果
			boxwindow.stop().animate({
				width		:	bw,
				height		:	bh,
				marginLeft	:	bl,
				marginTop	:	bt
			},{complete:istimeout()});
			boxframe.stop().animate({
				width : (bw - 2) +'px',
				height: (bh - 28) +'px'
			},{complete:istimeout()});
		}
		else
		{
			//初次打开窗口直接显示
			boxwindow.css('width', bw).css('height', bh).css('margin-left', bl).css('margin-top',bt);
			boxframe.css('width', parseInt(boxset.width) +'px').css('height', parseInt(boxset.height)+'px');
			istimeout();
		}
	},

	//自动关闭
	timeout : function(time)
	{
		if(this.autohide) clearTimeout(this.autohide);
		this.autohide = setTimeout("lightBox.hide()",time);
	},

	//关闭窗口
	hide : function(){
		if(this.autohide) clearTimeout(this.autohide);
		this.obj();
		boxwindow.stop();
		boxframe.stop();
		boxmask.hide();
		boxwindow.hide();
		$("html").css("overflow","");
		boxframe.attr('src','');
	}
}

lightBox.close = lightBox.hide;
function agjustDlg(w,h)
{
	lightBox.set({width:w,height:h+40});
}

function closeDialog()
{
	lightBox.hide();
}