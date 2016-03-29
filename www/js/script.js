$(document).ready(function(){

	/* $('.menu_click').click(function(){
		var $position = 122;
		
		if ( curHeight < $minHeight) {
			el_1.css('height', 'auto');
			el.height(curHeight).animate({height: autoHeight}, 500);
			$(this).find('.red_down_arrow').rotate({animateTo:180});
		}else{
			el_1.css('height', 'auto');
			el.animate({ "height": "122px" }, 500);
			$(this).find('.red_down_arrow').rotate({animateTo:0});
		}	
	}); */
	
	
	$('.color_sub,.color_s').click(function(){
		$('.color_sub,.color_s').animate({borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}, 100);
		$(this).animate({borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}, 300);
		$('.heart_icon').fadeOut('slow');
		$(this).find('.heart_icon').fadeIn('slow');
	});
	
	$('.shr_open').click(function(){
		$('.ovr_lay').fadeIn();
	});
	
	$('.shr_close').click(function(){
		$('.ovr_lay').fadeOut();
	});


	/* $('.container').click(function(){
		 $('.menu_li').animate({"left": "-80%"}, 100);
		$('.menu').animate({ "left": "-90%" }, 200 );
	}); */
	
});

