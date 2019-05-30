$(function(){

	$.ajax({
		type: 'post',
		url: '../controller/ctrusuarios.php',
		data: {
			action: 'tipo_identificacion',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$('#tipo_identificacion').append($('<option>', {
				value: '',
				text: '', 
			}));
			$.each(data, function(i, row){
				$('#tipo_identificacion').append($('<option>', {
					value: row.id,
					text: row.tipo_identificacion, 
				}));					
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$.ajax({
		type: 'post',
		url: '../controller/ctrtarifa.php',
		data: {
			action: 'lista_tarifa',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$('#tarifa').append($('<option>', {
				value: '',
				text: '', 
			}));
			$.each(data, function(i, row){
				$('#tarifa').append($('<option>', {
					value: row.id,
					text: row.categoria, 
				}));					
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$('#tarifa').change(function(){
		$('#total').val('0');
		$.ajax({
			type: 'post',
			url: '../controller/ctrtarifa.php',
			data: {
				action: 'tarifa_precio',
				id_tarifa: $(this).val()
			},
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				var data = $.parseJSON(result.msg);
				$.each(data, function(i, row){
					$('#total').val(row.precio);				
				});
			} else {
				console.log('Error: '+result.msg);
			}
		});
	});

	$('#taquilla_form').submit(function(e){
		e.preventDefault();
		var data = $('#taquilla_form').serialize();
		$.ajax({
			type: 'post',
			url: '../controller/ctrtaquilla.php',
			data: data,
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				swal({
					title: "Correcto!",
					text: result.msg,
					type: 'success',
					showCancelButton: false,
					confirmButtonClass: "btn-success",
					confirmButtonText: "Aceptar",
					closeOnConfirm: true,
				},function(){
					pageContent('artista/index');
				});
			} else {

				swal('Error!',result.msg,'error');
				console.log('Error: '+result.msg);
			}
		});
	});

});