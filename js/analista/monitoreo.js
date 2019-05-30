$(function(){
	$("select").select2();

	//Datepicker de fechas
	$.fn.datepicker.dates['es'] = {
		days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
		daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		today: "Hoy",
		clear: "Borrar",
		format: "yyyy-mm-dd",
		titleFormat: "MM yyyy"
	};
	$('.fechas_monitoreos').datepicker({
		pickTime: true,
		autoclose: true,
		language: 'es',
		opens: "center"
	});

	//
	$.ajax({
		type: 'post', 
		url: '../controller/ctrmonitoreo.php', 
		data: {
			action: 'data_monitoreo',
			id_empresa: $('#id_empresa').val(),
			id_campana: $('#id_campana').val(),
			id_asesor: $('#id_asesor').val(),
			id_agenda: $('#id_agenda').val(),
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$('#id_monitoreo').val(row.id_monitoreo);
				$('#cedula_asesor').val(row.identificacion);
				$('#nombre_asesor').val(row.nombres+" "+row.apellidos);
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$.ajax({
		type: 'post',
		url: '../controller/ctrmonitoreo.php',
		data: {
			action: 'tipificacion',
		},
		dataType: 'json'
	}).done(function(result){
		var data = $.parseJSON(result.msg);
		var html = '';
		html += '<option></option>';
		$.each(data, function(i, row){
			html += '<option value="'+row.id+'">'+row.nombre+'</option>';
		});
		$('#tipificacion').html(html);
	});

	$.ajax({
		type: 'post',
		url: '../controller/ctrmonitoreo.php',
		data: {
			action: 'solucion',
		},
		dataType: 'json'
	}).done(function(result){
		var data = $.parseJSON(result.msg);
		var html = '';
		html += '<option></option>';
		$.each(data, function(i, row){
			html += '<option value="'+row.id+'">'+row.tipos+'</option>';
		});
		$('#solucion').html(html);
	});

	$.ajax({
		type: 'post',
		url: '../controller/ctrmonitoreo.php',
		data: {
			action: 'audio',
		},
		dataType: 'json'
	}).done(function(result){
		var data = $.parseJSON(result.msg);
		var html = '';
		html += '<option></option>';
		$.each(data, function(i, row){
			html += '<option value="'+row.id+'">'+row.audio+'</option>';
		});
		$('#audio').html(html);
	});

	//
	$.ajax({
		type: 'post', 
		url: '../controller/ctrmonitoreo.php',
		data: {
			action: 'matriz_monitoreo',
			id_empresa: $('#id_empresa').val(),
			id_campana: $('#id_campana').val(),
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$.ajax({
					type: 'post', 
					url: '../controller/ctrmonitoreo.php',
					data: {
						action: 'tipo_error',
						id_matriz: row.id,
					},
					dataType: 'json'
				}).done(function(result2){
					if(result2.bool){
						var html = '';
						var data2 = $.parseJSON(result2.msg);
						var j = 0;
						$.each(data2, function(j, row2){
							j = j+1;
							html += '<div class="panel panel-primary">';
							html += '<div class="panel-heading text-center"><b>'+row2.tipo_error;
							html += '<input type="hidden" name="num_error" id="num_error" value="'+j+'">';
							html += '<input type="hidden" name="id_num_error_'+j+'" id="id_num_error_'+j+'" value="'+row2.id_error+'">';
							html += '</b></div>';
							html += '<div class="panel-body">';
							html += '<div id="item_error_'+j+'"></div>';
							var item_error = '#item_error_'+j;
							$.ajax({
								type: 'post',
								url: '../controller/ctrmonitoreo.php',
								data: {
									action: 'item_error',
									id_matriz: row.id,
									id_error: row2.id_error,
								},
								dataType: 'json'
							}).done(function(result3){
								var data3 = $.parseJSON(result3.msg);
								var html2 = '';
								var k = 0;

								$.each(data3, function(k, row3){
									k = k+1;

									html2 += '<script type="text/javascript">$("select").select2();</script>';
									html2 += '<div class="row">';
									html2 += '<div class="col-md-4">'+row3.item;
									html2 += '<input type="hidden" name="num_item_'+j+'" id="num_item_'+j+'" value="'+k+'">';
									html2 += '<input type="hidden" name="id_num_item_'+j+'_'+k+'" id="id_num_item_'+j+'_'+k+'" value="'+row3.id+'">';
									html2 += '</div>';
									html2 += '<div class="col-md-2">';
									html2 += '<select name="valor_cumplimiento_'+j+'_'+k+'" id="valor_cumplimiento_'+j+'_'+k+'" class="form-control" required="">';
									html2 += '<option></option>';
									html2 += '<option value="1">Cumple</option>';
									html2 += '<option value="0">No Cumple</option>';
									html2 += '</select>';
									html2 += '</div>';
									html2 += '<div class="col-md-2">';
									html2 += '<input type="text" name="valor_porcentaje_cumplimiento_'+j+'_'+k+'" id="valor_porcentaje_cumplimiento_'+j+'_'+k+'" class="form-control" value="" readonly="" required="">';
									html2 += '</div>';
									html2 += '<div class="col-md-4" id="canvas_punto_entrenamiento_'+j+'_'+k+'" style="display: none;">';
									html2 += '<select name="punto_item_'+j+'_'+k+'" id="punto_item_'+j+'_'+k+'" class="form-control" disabled="" style="width: 100%;"></select>';
									html2 += '</div>';
									html2 += '</div>';
									html2 += '</br>';

									var cumple_item 	= '#valor_cumplimiento_'+j+'_'+k;
									var porcentaje_item	= '#valor_porcentaje_cumplimiento_'+j+'_'+k;
									var canvas 			= '#canvas_punto_entrenamiento_'+j+'_'+k;
									var punto_item 		= '#punto_item_'+j+'_'+k;

									$.ajax({
										type: 'post',
										url: '../controller/ctrmonitoreo.php',
										data: {
											action: 'punto_entrenamiento',
											id_item: row3.id
										},
										dataType: 'json'
									}).done(function(result4){
										var data4 = $.parseJSON(result4.msg);
										var html3 = '';
										html3 += '<option></option>';
										$.each(data4, function(k, row4){
											html3 += '<option value="'+row4.id+'">'+row4.punto_entrenamiento+'</option>';
										});
										$(punto_item).html(html3);
									});

									html2 += '<script type="text/javascript">';
										
										html2 += 'if($(\''+cumple_item+'\').val() == "1"){';
											html2 += '$(\''+porcentaje_item+'\').val(\''+row3.valor+'\');';
											html2 += '$(\''+canvas+'\').hide();';
											html2 += '$(\''+punto_item+'\').attr("required", "false");';
										html2 += '} else if($(\''+cumple_item+'\').val() == "0"){';
											html2 += '$(\''+porcentaje_item+'\').val("0");';
											html2 += '$(\''+canvas+'\').show();';
											html2 += '$(\''+punto_item+'\').attr("required", "true");';
										html2 += '} else {';
											html2 += '$(\''+porcentaje_item+'\').val("");';
											html2 += '$(\''+canvas+'\').hide();';
											html2 += '$(\''+punto_item+'\').attr("required", "false");';
										html2 += '}';

										html2 += '$(\''+cumple_item+'\').change(function(){';
											html2 += 'if($(\''+cumple_item+'\').val() == "1"){';
												html2 += '$(\''+porcentaje_item+'\').val(\''+row3.valor+'\');';
												html2 += '$(\''+punto_item+'\').attr("disabled","disabled");';
												html2 += '$(\''+canvas+'\').hide();';
											html2 += '} else if($(\''+cumple_item+'\').val() == "0"){';
												html2 += '$(\''+porcentaje_item+'\').val("0");';
												html2 += '$(\''+punto_item+'\').removeAttr("disabled");';
												html2 += '$(\''+canvas+'\').show();';
											html2 += '} else {';
												html2 += '$(\''+porcentaje_item+'\').val("");';
												html2 += '$(\''+punto_item+'\').attr("disabled","disabled");';
												html2 += '$(\''+canvas+'\').hide();';
											html2 += '}';
										html2 += '});';

									html2 += '</script>';
								});
								$(item_error).html(html2);
							});
							html += '</div>';
							html += '</div>';
						});
						$('#panel_monitoreo').html(html);
					} else {
						console.log('Error: '+result2.msg);
					}
				});
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	//Envío del formulario para guardar en la base de datos
	$('#monitoreo_form').submit(function(e){
		e.preventDefault();
		var data = $('#monitoreo_form').serialize();
		swal({
			title: "¡Atención!",
			text: "Confirma el envío de la evaluación",
			type: 'warning',
			showCancelButton: true,
			confirmButtonClass: "btn-primary",
			confirmButtonText: "Aceptar",
			cancelButtonClass: "btn-danger",
			cancelButtonText: "Cancelar",
			closeOnConfirm: false,
		},function(){
			$.ajax({
				type: 'post',
				url: '../controller/ctrmonitoreo.php',
				data: data,
				dataType: 'json'
			}).done(function(result){
				if(result.bool){
					if (result.msg){
						$.ajax({
							type: 'post',
							url: '../controller/ctrmonitoreo.php',
							data: {
								action: 'total_monitoreo',
								id_mon: result.msg
							},
							dataType: 'json'
						}).done(function(result2){
							if(result2.bool){
								swal({
									title: "¡Correcto!",
									text: result2.msg,
									type: 'success',
									showCancelButton: false,
									confirmButtonClass: "btn-primary",
									confirmButtonText: "Aceptar",
									closeOnConfirm: true,
								},function(){
									pageContent('analista/agenda_monitoreo','id_empresa='+$('#id_empresa').val()+'&id_campana='+$('#id_campana').val()+'&id_asesor='+$('#id_asesor').val());
								});
							} else {
								console.log('Error: '+result2.msg);
							}
						});
					} else {
						console.log('Error: id monitoreo indefinido');
					}
				} else {
					console.log('Error: '+result.msg);
				}
			});
		});
	});

});