$(function(){
	$.ajax({
		type: 'post',
		url: '../controller/ctrmatriz.php',
		data: {
			action: 'data_matriz',
			id: $('#id_matriz').val(),
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$('#id').html(row.id);
				if(row.estado == 'activo'){
					$('#estado').append($('<option>', {
						value: 'activo',
						text: 'activo',
					}).attr("selected", true));
					$('#estado').append($('<option>', {
						value: 'inactivo',
						text: 'inactivo',
					}));
				} else {
					$('#estado').append($('<option>', {
						value: 'inactivo',
						text: 'inactivo',
					}).attr("selected", true));
					$('#estado').append($('<option>', {
						value: 'activo',
						text: 'activo',
					}));
				}
				$('#empresa_matriz').html(row.empresa);
				$('#campana_matriz').html(row.campana);
				$('#empresa_form').val(row.id_empresa);
				$('#campana_form').val(row.id_campana);
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$.ajax({
		type: 'post',
		url: '../controller/ctrmatriz.php',
		data: {
			action: 'data_matriz_error', 
			id_matriz: $('#id_matriz').val()
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			$.each(data, function(i, row){
				var count = i+1;
				$('.error').val(count);
				html += '<div class="panel panel-danger error" id="tipo_error_canvas_'+count+'">';
					html += '<div class="panel-heading bg-danger">';
						html += '<p><b>Tipo error '+count+'</b></p>';
					html += '</div>';
					html += '<div class="panel-body">';
						html += '<div class="row">';
							html += '<div class="col col-md-6">';
								html += '<div class="form-group">';
									html += '<label for="tipo_error_'+count+'" class="control-label">Error</label>';
									html += '<select name="tipo_error_'+count+'" id="tipo_error_'+count+'" class="form-control" required=""></select> ';
								html += '</div>';
							html += '</div>';
							html += '<div class="col col-md-2">';
								html += '<div class="form-group">';
									html += '<label for="calculo_porcentaje_'+count+'" class="control-label">Calculo Valor</label>';
									html += '<select name="calculo_porcentaje_'+count+'" id="calculo_porcentaje_'+count+'" class="form-control" required="" style="width:100%;"></select>';
								html += '</div>';
							html += '</div>';
							html += '<div class="col col-md-2">';
								html += '<div class="form-group">';
									html += '<label for="estado_error_'+count+'" class="control-label">Estado</label>';
									html += '<select name="estado_error_'+count+'" id="estado_error_'+count+'" class="form-control" required="" style="width:100%;"></select>';
								html += '</div>';
							html += '</div>';
							html += '<div class="col col-md-2">';
								html += '<button type="button" class="btn btn-danger btn-sm" onclick="javascript: addItem('+count+');">';
									html += 'Item Error <span class="glyphicon glyphicon-plus"></span>';
								html += '</button>';
								html += '<input type="hidden" id="item_error_'+count+'" name="item_error_'+count+'">';
							html += '</div>';
						html += '</div>';
						html += '<br>';
						html += '<div class="row">';
							html += '<div class="col col-md-12" id="canvas_item_error_'+count+'"></div>';
						html += '</div>';
					html += '</div>';
				html += '</div>';
			});
			
			$('#canvas_matriz').html(html);
			$("select").select2();

			$.each(data, function(i, row){
				var count = i+1;
				$.ajax({
					type: 'post',
					url: '../controller/ctrmatriz.php',
					data: {
						action: 'tipo_error',
					},
					dataType: 'json'
				}).done(function(result2){
					if(result2.bool){
						var data2 = $.parseJSON(result2.msg);
						$.each(data2, function(j, row2){

							if (row.tipo_error == row2.id){
								$('#tipo_error_'+count).append($('<option>', {
									value: row2.id,
									text: row2.error, 
								}).attr("selected", true));
							} else {	
								$('#tipo_error_'+count).append($('<option>', {
									value: row2.id,
									text: row2.error, 
								}));
							}

						});
					} else {
						console.log('Error: '+result2.msg);
					}
				});
				$('#calculo_porcentaje_'+count).empty();
				if(row.calculo_valor == 'por'){
					$('#calculo_porcentaje_'+count).append($('<option>', {
						value: 'por',
						text: 'Porcentual',
					}).attr("selected", true));
					$('#calculo_porcentaje_'+count).append($('<option>', {
						value: 'sum',
						text: 'Sumatorio',
					}));
				} else {
					$('#calculo_porcentaje_'+count).append($('<option>', {
						value: 'sum',
						text: 'Sumatorio',
					}).attr("selected", true));
					$('#calculo_porcentaje_'+count).append($('<option>', {
						value: 'por',
						text: 'Porcentual',
					}));
				}
				$('#estado_error_'+count).empty();
				if(row.estado == 'activo'){
					$('#estado_error_'+count).append($('<option>', {
						value: 'activo',
						text: 'activo',
					}).attr("selected", true));
					$('#estado_error_'+count).append($('<option>', {
						value: 'inactivo',
						text: 'inactivo',
					}));
				} else {
					$('#estado_error_'+count).append($('<option>', {
						value: 'inactivo',
						text: 'inactivo',
					}).attr("selected", true));
					$('#estado_error_'+count).append($('<option>', {
						value: 'activo',
						text: 'activo',
					}));
				}

				var canvas_item_error = '#canvas_item_error_'+count;

				$.ajax({
					type: 'post',
					url: '../controller/ctrmatriz.php',
					data: {
						action: 'data_matriz_item',
						id_matriz: $('#id_matriz').val(),
						id_error: row.id,
					},
					dataType: 'json'
				}).done(function(result2){
					if(result2.bool){
						var data2 = $.parseJSON(result2.msg);
						var html2 = ''
						
						$.each(data2, function(j, row2){
							var count2 = j+1;
							$('.item_n_'+count).val(count2);
							html2 += '<div class="panel panel-success item_n_'+count+'" id="item_error_'+count+'_'+count2+'">';
								html2 += '<div class="panel-heading bg-success">';
									html2 += '<p><b>Item '+count2+'</b></p>';
									html2 += '<input type="hidden" name="id_item_error_'+count+'_'+count2+'" id="id_item_error_'+count+'_'+count2+'" value="'+row2.id+'">';
								html2 += '</div>';
								html2 += '<div class="panel-body">';
									html2 += '<div class="row">';
										html2 += '<div class="col col-md-6">';
											html2 += '<div class="form-group">';
												html2 += '<label for="nombre_item_error_'+count+'_'+count2+'" class="control-label">Item</label>';
												html2 += '<input type="text" name="nombre_item_error_'+count+'_'+count2+'" id="nombre_item_error_'+count+'_'+count2+'" class="form-control" required="" value="'+row2.item+'">';
											html2 += '</div>';
										html2 += '</div>';
										html2 += '<div class="col col-md-2">';
											html2 += '<label for="valor_'+count+'_'+count2+'" class="control-label">Valor cumplimiento item</label>';
											html2 += '<input type="number" name="valor_'+count+'_'+count2+'" id="valor_'+count+'_'+count2+'" class="form-control" required="" min="1" max="100" value="'+row2.valor+'">';
										html2 += '</div>';

										html2 += '<div class="col col-md-2">';
											html2 += '<div class="form-group">';
												html2 += '<label for="estado_item_'+count+'_'+count2+'" class="control-label">Estado</label>';
												html2 += '<select name="estado_item_'+count+'_'+count2+'" id="estado_item_'+count+'_'+count2+'" class="form-control" required="" style="width:100%;"></select>';
											html2 += '</div>';
										html2 += '</div>';

										html2 += '<div class="col col-md-2">';
											html2 += '<button type="button" class="btn btn-success btn-sm" onclick="javascript: puntoEntrenamiento('+count+', '+count2+');">';
												html2 += 'Punto <span class="glyphicon glyphicon-plus"></span>';
											html2 += '</button>';
											html2 += '<input type="hidden" id="punto_entrenamiento_'+count+'_'+count2+'" name="punto_entrenamiento_'+count+'_'+count2+'">';
										html2 += '</div>';
									html2 += '</div>';
									html2 += '<br>';
									html2 += '<div class="row">';
										html2 += '<div class="col col-md-12" id="canvas_punto_entrenamiento_'+count+'_'+count2+'"></div>';
									html2 += '</div>';
								html2 += '</div>';
							html2 += '</div>';
						});

						$(canvas_item_error).html(html2);
						$("select").select2();

						$.each(data2, function(j, row2){
							var count2 = j+1;
							$('#estado_item_'+count+'_'+count2).empty();
							if(row2.estado == 'activo'){
								$('#estado_item_'+count+'_'+count2).append($('<option>', {
									value: 'activo',
									text: 'activo',
								}).attr("selected", true));
								$('#estado_item_'+count+'_'+count2).append($('<option>', {
									value: 'inactivo',
									text: 'inactivo',
								}));
							} else {
								$('#estado_item_'+count+'_'+count2).append($('<option>', {
									value: 'inactivo',
									text: 'inactivo',
								}).attr("selected", true));
								$('#estado_item_'+count+'_'+count2).append($('<option>', {
									value: 'activo',
									text: 'activo',
								}));
							}

							var canvas_punto_entrenamiento = '#canvas_punto_entrenamiento_'+count+'_'+count2;

							$.ajax({
								type: 'post',
								url: '../controller/ctrmatriz.php',
								data: {
									action: 'data_matriz_punto',
									id_item: row2.id,
								},
								dataType: 'json'
							}).done(function(result3){
								if(result3.bool){
									var data3 = $.parseJSON(result3.msg);
									var html3 = '';
									$.each(data3, function(k, row3){
										var count3 = k+1;
										$('.punto_n_'+count+'_'+count2).val(count3);
										html3 += '<div class="panel panel-primary punto_n_'+count+'_'+count2+'" id="punto_entrenamiento_'+count+'_'+count2+'_'+count3+'">';
											html3 += '<div class="panel-heading bg-primary">';
												html3 += '<p><b>Punto Entrenamiento '+count3+', Item '+count2+'</b></p>';
											html3 += '</div>';
											html3 += '<div class="panel-body">';
												html3 += '<div class="form-group">';
													html3 += '<div class="col col-md-12">';
														html3 += '<input type="hidden" name="id_punto_entrenamiento_'+count+'_'+count2+'_'+count3+'" id="id_punto_entrenamiento_'+count+'_'+count2+'_'+count3+'" value="'+row3.id+'">';
														html3 += '<input type="text" name="desc_punto_entrenamiento_'+count+'_'+count2+'_'+count3+'" id="punto_entrenamiento_'+count+'_'+count2+'_'+count3+'" class="form-control" required="" value="'+row3.punto_entrenamiento+'">';
													html3 += '</div>';
												html3 += '</div>';
											html3 += '</div>';
										html3 += '</div>';
									});
									$(canvas_punto_entrenamiento).html(html3);
								} else {
									console.log('Error: '+result3.msg);
								}
							});
						});
					} else {
						console.log('Error: '+result2.msg);
					}
				});
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$('#matriz_form').submit(function(e){
		e.preventDefault();
		$('#action').val('modificar_matriz');
		var data = $(this).serialize();
		$.ajax({
			type: 'post',
			url: '../controller/ctrmatriz.php',
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
					pageContent('administrador/matrices/index');
				});
			} else {
				swal('Error!',result.msg,'error');
				console.log('Error: '+result.msg);
			}
		});
	});


});

function addError(){
	var html = '';
	var count = ($('.error').length)+1;
	$('.error').val(count);
	html += '<div class="panel panel-danger error" id="tipo_error_canvas_'+count+'">';
		html += '<div class="panel-heading bg-danger">';
			html += '<p><b>Tipo error '+count+'</b></p>';
		html += '</div>';
		html += '<div class="panel-body">';
			html += '<div class="row">';
				html += '<div class="col col-md-6">';
					html += '<div class="form-group">';
						html += '<label for="tipo_error_'+count+'" class="control-label">Error</label>';
						html += '<select name="tipo_error_'+count+'" id="tipo_error_'+count+'" class="form-control" required=""></select> ';
					html += '</div>';
				html += '</div>';
				html += '<div class="col col-md-2">';
					html += '<div class="form-group">';
						html += '<label for="calculo_porcentaje_'+count+'" class="control-label">Calculo Valor</label>';
						html += '<select name="calculo_porcentaje_'+count+'" id="calculo_porcentaje_'+count+'" class="form-control" required="" style="width:100%;">';
							html += '<option></option>';
							html += '<option value="por">Porcentual</option>';
							html += '<option value="sum">Sumatorio</option>';
						html += '</select>';
					html += '</div>';
				html += '</div>';
				html += '<div class="col col-md-2">';
					html += '<span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" style="font-size: 30px;"></span>';
				html += '</div>';
				html += '<div class="col col-md-2">';
					html += '<button type="button" class="btn btn-danger btn-sm" onclick="javascript: addItem('+count+');">';
						html += 'Item Error <span class="glyphicon glyphicon-plus"></span>';
					html += '</button>';
					html += '<input type="hidden" id="item_error_'+count+'" name="item_error_'+count+'">';
				html += '</div>';
			html += '</div>';
			html += '<br>';
			html += '<div class="row">';
				html += '<div class="col col-md-12" id="canvas_item_error_'+count+'"></div>';
			html += '</div>';
		html += '</div>';
	html += '</div>';
	$('#canvas_matriz').append(html);

	$("select").select2();
	$('[data-toggle="tooltip"]').tooltip({
		"container": "body", 
		"title": "Se puede seleccionar entre valor porcentual y sumatorio. El valor porcentual determina el mismo valor para todos los items del error (0 o 100). El valor sumatorio es incremental para todos los items del error y se debe calcular de 0 a 100"
	});

	$.ajax({
		type: 'post',
		url: '../controller/ctrmatriz.php',
		data: {
			action: 'tipo_error',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<option value=""></option>';
			$.each(data, function(i, row){
				html += '<option value="'+row.id+'">'+row.error+'</option>';
			});
			$('#tipo_error_'+count).html(html);
		} else {
			console.log('Error: '+result.msg);
		}
	});
}

function addItem(error_n){
	var html = '';
	var class_error = '.item_n_'+error_n;
	var count = ($(class_error).length)+1;
	$('.item_n_'+error_n).val(count);
	html += '<div class="panel panel-success item_n_'+error_n+'" id="item_error_'+error_n+'_'+count+'">';
		html += '<div class="panel-heading bg-success">';
			html += '<p><b>Item '+count+'</b></p>';
		html += '</div>';
		html += '<div class="panel-body">';
			html += '<div class="row">';
				html += '<div class="col col-md-6">';
					html += '<div class="form-group">';
						html += '<label for="nombre_item_error_'+error_n+'_'+count+'" class="control-label">Item</label>';
						html += '<input type="text" name="nombre_item_error_'+error_n+'_'+count+'" id="nombre_item_error_'+error_n+'_'+count+'" class="form-control" required="">';
					html += '</div>';
				html += '</div>';
				html += '<div class="col col-md-3">';
					html += '<label for="valor_'+error_n+'_'+count+'" class="control-label">Valor cumplimiento item</label>';
					html += '<input type="number" name="valor_'+error_n+'_'+count+'" id="valor_'+error_n+'_'+count+'" class="form-control" required="" min="1" max="100">';
				html += '</div>';
				html += '<div class="col col-md-3">';
					html += '<button type="button" class="btn btn-success btn-sm" onclick="javascript: puntoEntrenamiento('+error_n+', '+count+');">';
						html += 'Punto <span class="glyphicon glyphicon-plus"></span>';
					html += '</button>';
					html += '<input type="hidden" id="punto_entrenamiento_'+error_n+'_'+count+'" name="punto_entrenamiento_'+error_n+'_'+count+'">';
				html += '</div>';
			html += '</div>';
			html += '<br>';
			html += '<div class="row">';
				html += '<div class="col col-md-12" id="canvas_punto_entrenamiento_'+error_n+'_'+count+'"></div>';
			html += '</div>';
		html += '</div>';
	html += '</div>';
	$('#canvas_item_error_'+error_n).append(html);
	$("select").select2();
}

function puntoEntrenamiento(error_n, item_n){
	var html = '';
	var class_item = '.punto_n_'+error_n+'_'+item_n;
	var count = ($(class_item).length)+1;
	$('.punto_n_'+error_n+'_'+item_n).val(count);
	html += '<div class="panel panel-primary punto_n_'+error_n+'_'+item_n+'" id="punto_entrenamiento_'+error_n+'_'+item_n+'_'+count+'">';
		html += '<div class="panel-heading bg-primary">';
			html += '<p><b>Punto Entrenamiento '+count+', Item '+item_n+'</b></p>';
		html += '</div>';
		html += '<div class="panel-body">';
			html += '<div class="form-group">';
				html += '<div class="col col-md-12">';
					html += '<input type="text" name="desc_punto_entrenamiento_'+error_n+'_'+item_n+'_'+count+'" id="punto_entrenamiento_'+error_n+'_'+item_n+'_'+count+'" class="form-control" required="">';
				html += '</div>';
			html += '</div>';
		html += '</div>';
	html += '</div>';
	$('#canvas_punto_entrenamiento_'+error_n+'_'+item_n).append(html);
	$("select").select2();
}