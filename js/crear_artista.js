$(function(){
	$('#guardar').hide();

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

	$('#artista_form').submit(function(e){
		e.preventDefault();
		var data = $('#artista_form').serialize();
		$.ajax({
			type: 'post',
			url: '../controller/ctrartista.php',
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

function addObras(){

	var html = '';
	var count = ($('.obra').length)+1;
	$('.obra').val(count);
	$('#numero_obras').val(count);

	html += '<div class="obra" id="obra_canvas_'+count+'">';
		html += '<div class="row">';
			html += '<div class="col col-md-12">';
				html += '<h3>Obra # '+count+'</h3>';
			html += '</div>';
		html += '</div>';
		html += '<div class="row">';
			html += '<div class="col col-md-4">';
				html += '<div class="form-group">';
					html += '<label for="tipo_obra_'+count+'" class="control-label">Tipo de Obra</label>';
					html += '<select name="tipo_obra_'+count+'" id="tipo_obra_'+count+'" class="form-control" required=""></select>';
				html += '</div>';
			html += '</div>';
			html += '<div class="col col-md-8">';
				html += '<div class="form-group">';
					html += '<label for="nombre_obra_'+count+'" class="control-label">Título de Obra</label>';
					html += '<input type="text" class="form-control" id="nombre_obra_'+count+'" name="nombre_obra_'+count+'" placeholder="Título que artista dio a la obra" required="">';
				html += '</div>';
			html += '</div>';
		html += '</div>';
		html += '<div class="row">';
			html += '<div class="col col-md-3">';
				html += '<div class="form-group">';
					html += '<label for="en_venta_'+count+'" class="control-label">En venta?</label>';
					html += '<select name="en_venta_'+count+'" id="en_venta_'+count+'" class="form-control" required="">';
						html += '<option></option>';
						html += '<option value="si">Si</option>';
						html += '<option value="no">No</option>';
					html += '</select>';
				html += '</div>';
			html += '</div>';
			html += '<div class="col col-md-3">';
				html += '<div class="form-group">';
					html += '<label for="precio_'+count+'" class="control-label">Precio</label>';
					html += '<input type="number" class="form-control" id="precio_'+count+'" name="precio_'+count+'" value="0" required="" nim="0" max="999999999">';
				html += '</div>';
			html += '</div>';
			html += '<div class="col col-md-3">';
				html += '<div class="form-group">';
					html += '<label for="sala_exposicion_'+count+'" class="control-label">Sala de exposición</label>';
					html += '<select name="sala_exposicion_'+count+'" id="sala_exposicion_'+count+'" class="form-control" required="">';
					html += '</select>';
				html += '</div>';
			html += '</div>';
			html += '<div class="col col-md-3">';
				html += '<div class="form-group">';
					html += '<label for="posicion_'+count+'" class="control-label">Posición</label>';
					html += '<input type="text" class="form-control" id="posicion_'+count+'" name="posicion_'+count+'" required="">';
				html += '</div>';
			html += '</div>';
		html += '</div>';
	html += '<div>';
	html += '<hr>';
	html += '<br>';

	$('#canvas_obras').append(html);

	var obra = '#tipo_obra_'+count;
	$(obra).empty();
	$.ajax({
		type: 'post',
		url: '../controller/ctrartista.php',
		data: {
			action: 'tipo_obra',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$(obra).append($('<option>', {
				value: '',
				text: '', 
			}));	
			$.each(data, function(i, row){
				$(obra).append($('<option>', {
					value: row.id,
					text: row.tipo, 
				}));					
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	var sala = '#sala_exposicion_'+count;
	$(sala).empty();
	$.ajax({
		type: 'post',
		url: '../controller/ctrartista.php',
		data: {
			action: 'sala_exposicion',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$(sala).append($('<option>', {
				value: '',
				text: '', 
			}));	
			$.each(data, function(i, row){
				$(sala).append($('<option>', {
					value: row.id,
					text: row.sala, 
				}));					
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	if($('#numero_obras').val() == 0){
		$('#guardar').hide();
	} else {
		$('#guardar').show();
	}
}