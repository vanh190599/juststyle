$(function(){
	$(document).on('click','#fb_header', function () {
		$('#fb_content').toggle('blind');
		return false;
	})
	$(document).on('click','.fb_header', function () {
		$('#fb_content').toggle('blind');
		return false;
	})

	$(document).on('click','#fb_close', function () {
		$('#fb_box').toggle();
		return false;
	})

	$(document).on('click','#fb_box_show', function () {
		$('#fb_box').toggle();
		return false;
	})
})
