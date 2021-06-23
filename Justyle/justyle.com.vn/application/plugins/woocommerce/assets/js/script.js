var body 		= $(document);

var plugin 		= 'woocommerce';

var quantity 	=  0;

var product_id 	=  0;

$(function(){

	var ajax = domain+'admin/plugins/ajax/woocommerce';
	//click chọn option
	//click chọn option
	body.on('click','.wcm-box-options .options .item',function(){
		var box 	= $(this).closest('.options');
		box.find('label').removeClass('active');
		$this = $(this).closest('label');
		$this.addClass('active');
	});

	body.on('click','.wcm-box-options .option_input', function(){
		var option     = '';

		var product_id = $('.add_to_cart').attr('data-id');

		//get option value
		if (isset($('#option_form').html())) {
			$group = 0;
			$item = 0;
			var option = $('#option_form').serialize();
		}

		var data = {
			action 		: 'wcm_ajax_product_info',
			option 		: option,
			product_id 	: product_id,
		};

		$jqxhr = $.post(ajax, data, function() {}, 'json');

		$jqxhr.done(function(data) {
			if(data.type == 'success') {
				$('#product-info').find('p.price span').text(data.data.price+'₫');
				if(parseInt(data.data.quantity) == 0) {
					$('#status').text('Hết hàng');
					$('#status').addClass('status-off');
					$('#status').removeClass('status-on');
				}
				else {
					$('#status').text('Còn hàng');
					$('#status').addClass('status-on');
					$('#status').removeClass('status-off');
				}
			}
			else show_message(data.message, data.type);
		});
	})

	//click đặt hàng
	body.on('click','.add_to_cart',function(){

		var box        = $(this).closest('.box-cart');

		var quantity   = $('#quantity').val();

		var product_id = $(this).attr('data-id');

		var option     = '';

		if (typeof quantity == 'undefined' || quantity <= 0) quantity = 1;
		//get option value
		if (isset($('#option_form').html())) {
			$group = 0;
			$item = 0;
			$('#option_form .wcm-box-options').each(function(index, el) {
				$group++;
				if(isset($(this).find('input.option_input:checked').val())) $item++;
			});
			var option = $('#option_form').serialize();

			if(option.length <= 0 || $group != $item) {
				show_message('Bạn phải chọn thông tin sản phẩm', 'warning');
				return false;
			}
		}

		var data = {
			action 		: 'wcm_ajax_add_cart',
			option 		: option,
			quantity 	: quantity,
			product_id 	: product_id,
		};

		$jqxhr = $.post(ajax, data, function() {}, 'json');

		$jqxhr.done(function(data) {
			show_message(data.message, data.type);
			if(data.type == 'success') window.location = domain+'gio-hang';
		});
	});

	//page đơn hàng
	body.on('click','.wcm-box-order .btn-qty button',function(){

		var box        	= $(this).closest('td');

		var quantity   	= Number(box.find('input[name="qty"]').val());

		var action 		= $(this).attr('class');

		var rowid 		= $(this).attr('data-id');

		if(action == "plus") {
			quantity += 1;
		} else {
			quantity -= 1;
			if(quantity  <= 0 ) quantity = 1;
		}

		var data = {
			action 	: 'wcm_ajax_up_cart',
			rowid 	: rowid,
			qty 	: quantity,
		};

		$jqxhr = $.post(ajax, data, function() {}, 'json');

		$jqxhr.done(function(data) {
			if(data.type == 'success') {
				box.find('input[name="qty"]').val(quantity);
				box.closest('tr').find('.subtotal').text(data.subtotal+'₫');
				$('#total').text(data.total+'₫');
			}
		});
	});

});