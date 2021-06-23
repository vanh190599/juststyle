$(function() {

	console.log("%c CLEVIETNAM Thiết kế và phát triển website hàng đầu.","font-size:25px; background-color: #0165bb; color: #fff;font-family: tahoma;padding:5px 10px;");
	//Fixed menu scroll
	var nav = $('.header-main');
	var nav_p = nav.position();
	$(window).scroll(function () {
		if ($(this).scrollTop() > nav_p.top) {
			nav.addClass('fixed');
		} else {
			nav.removeClass('fixed');
		}
	});

	var nav_m = $('.navigation-mobile');
	var nav_p = nav_m.position();
	$(window).scroll(function () {
		if ($(this).scrollTop() > nav_p.top) {
			nav_m.addClass('fixed');
		} else {
			nav_m.removeClass('fixed');
		}
	});

	if (typeof $("#zoom_03").html() != 'undefined')
	{
		$("#zoom_03").elevateZoom({
	  		scrollZoom : true, 
	  		gallery:'gallery_01', 
	  		cursor: 'pointer',
	  		galleryActiveClass: 'active',
	  	});
	}
});

//hiển thị thông báo
function show_message(text, icon) {
    $.toast({
        heading: "Alert",
        text: text,
        position: 'top-left',
        icon: icon,
        hideAfter: 5000,
    });
}

//kiểm tra đối tượng có tồn tại không
function isset($element) {
    if (typeof $element != 'undefined')
        return true;
    return false;
}

//slider chạy dọc
function vertical(element, interval, item, direction = 'up') {
    $(element).easyTicker({
		direction: 'up',
		easing: 'swing',
		speed: 'slow',
		interval: interval,
		visible: item,
		mousePause: 1,
	});
}

//slider chạy ngang
function horizontal(element, interval, item, rep, button = '') {
	var ol = $(element).owlCarousel({
	    items				:item,
	    margin				:10,
	    loop				:true,
	   	autoplay			:true,
	    autoplayTimeout		:interval,
	    autoplayHoverPause	:true,
		smartSpeed			: 1000,
	    responsive			: rep
	});

	if(button != '') {
		$(button+' .next').click(function() {
	    	ol.trigger('next.owl.carousel', [1000]);
		})
		$(button+' .prev').click(function() {
		    ol.trigger('prev.owl.carousel', [1000]);
		});
	}
}