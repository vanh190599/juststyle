var $body     = $(document);

//ajax user login admin
$body.on('submit','#user-form-login', function(){
	var data = {
		'username' : $(this).find('input[name="username"]').val(),
		'password' : $(this).find('input[name="password"]').val(),
	};

	load = $(this).find('.loader');

	load.show();
	$('button[type="submit"]').hide();

	$jqxhr   = $.post(path+'/ajax_login',data, function(data) {}, 'json');
	$jqxhr.done(function( data ) {
      	show_message(data.message, data.type);

      	if(data.type == 'success') {
			$('.wcm-loading').show();
			setTimeout( function() {
				window.location = base;
			}, 1000 );
      		
      	}
      	else {
      		load.hide();
			$('button[type="submit"]').show();
      	}

    });

    return false;
});

//ajax phân quyền nhóm hiển thị
$body.on('ifChecked', 'input.rule_nav', function(event) {
	var $group_id 	= $(this).val();
	var $nav_id 	= $(this).attr('data-nav');
	var datas = {};
	datas[$group_id+'_'+$nav_id] = $(this).attr('data-nav');
	$('input[name="select_'+$group_id+'"]').each(function(index, el) {
		if($(this).prop("checked") == true){
			datas[$(this).val()+'_'+$(this).attr('data-nav')] = $(this).attr('data-nav');
		}
	});
	ajax_upload_rule(datas, $group_id);
});

$body.on('ifUnchecked', 'input.rule_nav', function(event) {
	var $group_id 	= $(this).val();
	var $nav_id 	= $(this).attr('data-nav');
	var datas = {};
	$('input[name="select_'+$group_id+'"]').each(function(index, el) {
		if($(this).prop("checked") == true){
			datas[$(this).val()+'_'+$(this).attr('data-nav')] = $(this).attr('data-nav');
		}
	});
	ajax_upload_rule(datas, $group_id);
});

function ajax_upload_rule(datas, $group_id) {
	$jqxhr   = $.post(path+'/ajax_upload_rule/'+ $group_id, datas, function(data) {}, 'json');
	$jqxhr.done(function( data ) {
      	show_message(data.message, data.type);
    });
	return false;
}

//ajax lấy lại mật khẩu
var id = 0;
var check = false;
$body.on('click', '.btn-reset-pass', function(){
	id  = $(this).attr('href');
	$('#modalreset').modal('show');
	return false;
});

$body.on('submit', '#form-check-pass', function() {
	var datas = {
		'password' : $('#form-check-pass input[name="password"]').val(),
		'check'	   : check,
	}
	$jqxhr   = $.post(path+'/ajax_reset_pass', datas, function(data) {}, 'json');
	$jqxhr.done(function( data ) {
		if(data.type == 'success') {
			$('#form-check-pass').find('label').html('<span style="color:red">Mật khẩu mới</span>');
			$('#form-check-pass').find('input[name="password"]').val('');
			$('#form-check-pass').attr('id','form-reset-pass');
			check = true;
		}
		else {
			show_message(data.message, data.type);
		}
    });
	return false;
});


$body.on('submit', '#form-reset-pass', function() {
	var datas = {
		'password' : $('#form-reset-pass input[name="password"]').val(),
		'id'	   : id,
		'check'	   : check,
	}
	$jqxhr   = $.post(path+'/ajax_reset_pass', datas, function(data) {}, 'json');
	$jqxhr.done(function( data ) {
		show_message(data.message, data.type);
		if(data.type == 'success') {
			$('#modalreset').modal('hide');
			$('#form-reset-pass').find('label').html('Mật Khẩu của bạn');
			$('#form-reset-pass').find('input[name="password"]').val('');
			$('#form-reset-pass').attr('id','form-check-pass');
			check = false;
			id = 0;
		}
    });
	return false;
});