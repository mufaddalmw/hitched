var Site = {
	init: function() {
		this
			._fontResize()
			._contentPosition()
			._scrollAnim()
			._spotVideo();
	},
	_fontResize: function(){
		$('body').flowtype({
			minimum   : 768,
			minFont   : 12,
			fontRatio : 100
		}); 
		return this;
	},
	_contentPosition: function(){
		var newTopPos;
		//headerH = $('.global-header').width()/2;
		headerH = $(window).height();
		$('.spotlight, .mask').css('height', headerH+'px')
		$('.global-header').css('height', headerH+'px')
		//$('.content-wrapper').css('top', headerH+'px');
		//$('.global-footer').css('top', headerH+'px');
		newTopPos = headerH*15.3125/100;
		//$('.block-wrapper').css({'top': newTopPos*-1+'px',marginBottom: newTopPos*-1+'px'});
		$(window).resize(function() {
			if(!$('.global-header').hasClass('fixed-header')){
				headerH = $('.global-header').width()/2;
				$('.spotlight').css('height', headerH+'px')
				$('.global-header').css('height', headerH+'px')
				//$('.content-wrapper').css('top', headerH+'px');
				$('.global-footer').css('top', headerH+'px');
				newTopPos = headerH*15.3125/100;
				//$('.block-wrapper').css({'top': newTopPos*-1+'px',marginBottom: newTopPos*-1+'px'});
			}
		});
		return this;
	},
	_scrollAnim: function(){
		var lastScrollTop = 0;
		$(window).scroll(function(event){console.clear();console.log($(this).scrollTop());
			var scrollTop = $(this).scrollTop();
			if(scrollTop >= 415/640*headerH){
				//$('.global-header').addClass('fixed-header');
				//$('.spotlight').addClass('fixed-spot');
				//$('.content-wrapper').addClass('scrolling-content');
				$('.gradient-mask').fadeIn('fast');			
			}
			else{
				//$('.global-header').removeClass('fixed-header');
				//$('.spotlight').removeClass('fixed-spot');
				//$('.content-wrapper').removeClass('scrolling-content');
				$('.gradient-mask').fadeOut('fast');	
			}
			if(scrollTop >= 210/640*headerH){
				$('.logo').css('position', 'fixed');
				$('.logo').addClass('stick');
				
				$('.logo').css('top', '21px');
				$('.spot-head, .global-nav').addClass('fade');
			}
			else{
				$('.logo').css('position', 'absolute');
				$('.logo').removeClass('stick');
				$('.logo').css('top', '39.53125%');
				$('.spot-head, .global-nav').removeClass('fade');
			}
			if (scrollTop > lastScrollTop){
				sT = scrollTop;
				scrollTop = 100-scrollTop;
				if(scrollTop >= -100){
					scrollTop = scrollTop/100;
					sT = sT/100;
					//$('.spot-head').css('opacity', scrollTop);
					//$('.logo-title').css('opacity', scrollTop);
					$('.add-h').css('opacity', sT);
					//$('.image-list h1').css('opacity', scrollTop);
				}
			}
			lastScrollTop = scrollTop;
		});
		return this;
	},
	_spotVideo: function(){
		$('#video-bg').videoBG({
			mp4:'video/tunnel_animation.mp4',
			ogv:'video/tunnel_animation.ogv',
			webm:'video/tunnel_animation.webm',
			poster:'video/tunnel_animation.jpg',
			scale:true,
			zIndex:0,
			height:'100%'
		});
		var min_w = $(window).width();
		var vid_w_orig;
		var vid_h_orig;
		$(function() {
		    vid_w_orig = parseInt($('#video-bg video').attr('width'));
		    vid_h_orig = parseInt($('#video-bg video').attr('height'));
		    $(window).resize(function () { resizeToCover(); });
		});
		$('#video-bg video').prop("volume", "0.5");
		function resizeToCover() {
			$('.videoBG').height(scale * vid_h_orig);
		    $('.videoBG').width($(window).width());
		    var scale_h = $(window).width() / vid_w_orig;
		    var scale_v = $(window).height() / vid_h_orig;
		    var scale = scale_h > scale_v ? scale_h : scale_v;
		    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};
		    $('#video-bg video').css("top", "0");
		    $('#video-bg video').width(scale * vid_w_orig);
		    $('#video-bg video').height(scale * vid_h_orig);
		    $('.videoBG').height($(window).height());
		    $('.videoBG').scrollLeft(($('#video-bg video').width() - $(window).width()) / 2);
		    $('.videoBG').scrollTop(($('#video-bg video').height() - $(window).height()) / 2);
		};
	}
};
$(function() {
	Site.init();
	
	// full video "Fitvid" Video Initialization
	if ( $(".videoWrapper").is(":visible") ) {
	 $(".videoWrapper").fitVids();
	}//end
	
	// Photos page heart click active function
	$('[data-js="heart"]').click(function(){
		$(this).toggleClass('active');
	});
	
	//Likes afterline calcuation on photos page
	
	likeLineHeight();
	$(window).resize(function(){
		likeLineHeight();
	});
	
});
function likeLineHeight() {
	$likeslineHeight = $('.right-options-wrap').height();
	
	$likeslineHeight = $likeslineHeight - 315;
	$('.likes-afterline').height($likeslineHeight);
}





$(window).load(function(){
	likeLineHeight();
});