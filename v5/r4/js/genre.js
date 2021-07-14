$(function(){
	$("#showGenreHelp").mouseover(function(){
		$("#genreDescription").css('left',$(this).offset().left + 26).css('top',$(this).offset().top - 6).show();
	}).mouseout(function(){
		$("#genreDescription").hide();
	});
});
