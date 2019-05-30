$(function(){

	$.ajax({
		type: 'post',
		url: '../controller/ctrtipomenu.php',
		data: {
			action: 'lista_tipo_menu',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$('#tipo_menu').append($('<option>', {
				value: '',
				text: '', 
			}));	
			$.each(data, function(i, row){
				$('#tipo_menu').append($('<option>', {
					value: row.id,
					text: row.tipo_menu, 
				}));					
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$('#tipo_menu').change(function(){
		$('#menu_dia').empty();

		$.ajax({
			type: 'post',
			url: '../controller/ctrmenu.php',
			data: {
				action: 'menu_dia',
				tipo_menu: $(this).val()
			},
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				var html = '';
				$.each(data, function(i, row){
					

					
				});
			} else {
				console.log('Error: '+result.msg);
			}		
		});

	});	
});