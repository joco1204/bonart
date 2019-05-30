$(function(){

	//Ajax tabla campanas
	$.ajax({
		type: 'post',
		url: '../controller/ctrasesor.php',
		data: {
			action: 'tabla_asesor',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<table class="table table-striped table-bordered display" id="tabla_asesor">';
			html += '<thead>';
			html += '<tr>';
			html += '<th>ID ASESOR</th>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE(S)</th>';
			html += '<th>APELLIDO(S)</th>';
			html += '<th>EMPRESA</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th>ESTADO</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.identificacion+'</td>';
				html += '<td>'+row.nombres+'</td>';
				html += '<td>'+row.apellidos+'</td>';
				html += '<td>'+row.empresa+'</td>';
				html += '<td>'+row.campana+'</td>';
				html += '<td>'+row.estado+'</td>';
				html += '<td><button type="button" class="btn btn-success btn-xs" onclick="javascript: modificar_asesor(\''+row.id+'\');">Modificar</button></td>';
				html += '</tr>';
			});
			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>ID ASESOR</th>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE(S)</th>';
			html += '<th>APELLIDO(S)</th>';
			html += '<th>EMPRESA</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th>ESTADO</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';

			$('#data_asesor').html(html);
			$('#tabla_asesor').dataTable({
				"order": [ 0, "asc" ],
				"pageLength": 25, 
				"language": {
					"sProcessing":     "Procesando...",
					"sLengthMenu":     "Mostrar _MENU_ registros",
					"sZeroRecords":    "No se encontraron resultados",
					"sEmptyTable":     "Ningún dato disponible en esta tabla",
					"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
					"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
					"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
					"sInfoPostFix":    "",
					"sSearch":         "Buscar:",
					"sUrl":            "",
				    "sInfoThousands":  ",",
				    "sLoadingRecords": "Cargando...",
				    "oPaginate": {
						"sFirst":    "Primero",
						"sLast":     "Último",
						"sNext":     "Siguiente",
						"sPrevious": "Anterior"
				    },
				    "oAria": {
						"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
						"sSortDescending": ": Activar para ordenar la columna de manera descendente"
				    }
				}
			});
			$("select").select2();

		} else {
			console.log('Error: '+result.msg);
		}
	});

	//empresas
	$.ajax({
		type: 'post',
		url: '../controller/ctrempresas.php',
		data: {
			action: 'empresas',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<option value=""></option>';
			$.each(data, function(i, row){
				html += '<option value="'+row.id+'">'+row.empresa+'</option>';
			});
			$('#empresa').html(html);
		} else {
			console.log('Error: '+result.msg);
		}
	});


	$('#empresa').change(function(){
		//campanas
		$.ajax({
			type: 'post',
			url: '../controller/ctrcampanas.php',
			data: {
				action: 'campanas',
				id_empresa: $(this).val(),
			},
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				var data = $.parseJSON(result.msg);
				var html = '';
				html += '<option value=""></option>';
				$.each(data, function(i, row){
					html += '<option value="'+row.id+'">'+row.campana+'</option>';
				});
				$('#campana').html(html);
			} else {
				console.log('Error: '+result.msg);
			}
		});
	});

	//Crea asesor
	$('#form_crear_asesor').submit(function(e){
		e.preventDefault();
		var data = $('#form_crear_asesor').serialize();
		
		$.ajax({
			type: 'post',
			url: '../controller/ctrasesor.php',
			data: data,
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				$('#crear_asesor').modal().hide();
				$("#crear_asesor .close").click();
				swal({
					title: "Correcto!",
					text: result.msg,
					type: 'success',
					showCancelButton: false,
					confirmButtonClass: "btn-success",
					confirmButtonText: "Aceptar",
					closeOnConfirm: true,
				},function(){
					pageContent('administrador/asesores/index');
				});
			} else {
				swal('Error!',result.msg,'error');
				console.log('Error: '+result.msg);
			}
		});
	});

	//Ajax upload file product
	$('#cargar_asesores_form').submit(function(e){
		e.preventDefault();
		$('#cargar_asesores').modal('toggle');
		var file = $('#archivo_asespres').prop('files')[0];
		var data = new FormData();
		data.append('action', 'cargar_asesores');
		data.append('file', file);
		$.ajax({
			type: 'post',
			url: '../controller/ctrasesor.php',
			data: data,
			processData: false,
			contentType: false,
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				swal({
					title: "Success!",
					text: result.msg,
					type: 'success',
					showCancelButton: false,
					confirmButtonClass: "btn-success",
					confirmButtonText: "Aceptar",
					closeOnConfirm: true,
				},function(){
					pageContent('administrador/asesores/index');
				});
			} else {
				swal('Error!',result.msg,'error');
				console.log('Error: '+result.msg);
			}
		});
	});

	//Modificar asesor
	$('#modificar_asesor').submit(function(e){
		e.preventDefault();
		var data = $('#form_modificar_asesor').serialize();
		$.ajax({
			type: 'post',
			url: '../controller/ctrasesor.php',
			data: data,
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				$('#modificar_asesor').modal().hide();
				$("#modificar_asesor .close").click();
				swal({
					title: "Correcto!",
					text: result.msg,
					type: 'success',
					showCancelButton: false,
					confirmButtonClass: "btn-success",
					confirmButtonText: "Aceptar",
					closeOnConfirm: true,
				},function(){
					pageContent('administrador/asesores/index');
				});
			} else {
				swal('Error!',result.msg,'error');
				console.log('Error: '+result.msg);
			}
		});
	});
});

function modificar_asesor(id_asesor){
	$("#modificar_asesor").modal();

	$.ajax({
		type: 'post',
		url: '../controller/ctrasesor.php',
		data: {
			action: 'data_asesor',
			id: id_asesor,
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$('#id_asesor').html(row.id);
				$('#id_asesor_m').val(row.id);
				$('#identificacion_m').val(row.identificacion);
				$('#nombres_m').val(row.nombres);
				$('#apellidos_m').val(row.apellidos);

				//Ajax empresa
				$('#empresa_m').empty();
				$.ajax({
					type: 'post',
					url: '../controller/ctrempresas.php',
					data: {
						action: 'empresas',
					},
					dataType: 'json'
				}).done(function(result2){
					if(result2.bool){
						var data2 = $.parseJSON(result2.msg);
						$.each(data2, function(i, row2){
							if (row.id_empresa == row2.id){
								$('#empresa_m').append($('<option>', {
									value: row2.id,
									text: row2.empresa, 
								}).attr("selected", true));
							} else {	
								$('#empresa_m').append($('<option>', {
									value: row2.id,
									text: row2.empresa, 
								}));
							}
						});
					} else {
						console.log('Error: '+result2.msg);
					}
				});

				//Ajax campañas
				$('#campana_m').empty();
				$.ajax({
					type: 'post',
					url: '../controller/ctrcampanas.php',
					data: {
						action: 'campanas',
						id_empresa: row.id_empresa,
					},
					dataType: 'json'
				}).done(function(result2){
					if(result2.bool){
						var data2 = $.parseJSON(result2.msg);
						$.each(data2, function(i, row2){
							if (row.id == row2.id){
								$('#campana_m').append($('<option>', {
									value: row2.id,
									text: row2.campana, 
								}).attr("selected", true));
							} else {	
								$('#campana_m').append($('<option>', {
									value: row2.id,
									text: row2.campana, 
								}));
							}
						});
					} else {
						console.log('Error: '+result2.msg);
					}
				});

				//Cuando cambia la empresa
				$('#empresa_m').change(function(){
					//Ajax campañas
					$('#campana_m').empty();
					$.ajax({
						type: 'post',
						url: '../controller/ctrcampanas.php',
						data: {
							action: 'campanas',
							id_empresa: $('#empresa_m').val(),
						},
						dataType: 'json'
					}).done(function(result2){
						if(result2.bool){
							var data2 = $.parseJSON(result2.msg);
							$.each(data2, function(i, row2){
								$('#campana_m').append($('<option>', {
									value: '',
									text: '', 
								}));
								$('#campana_m').append($('<option>', {
									value: row2.id,
									text: row2.campana, 
								}));
							});
						} else {
							console.log('Error: '+result2.msg);
						}
					});
				});

				//Muestra las opciones de activo e inactivo
				$('#estado_m').empty();
				if(row.estado == 'activo'){
					$('#estado_m').append($('<option>', {
						value: 'activo',
						text: 'activo',
					}).attr("selected", true));
					$('#estado_m').append($('<option>', {
						value: 'inactivo',
						text: 'inactivo',
					}));
				} else {
					$('#estado_m').append($('<option>', {
						value: 'inactivo',
						text: 'inactivo',
					}).attr("selected", true));
					$('#estado_m').append($('<option>', {
						value: 'activo',
						text: 'activo',
					}));
				}

			});
		} else {
			console.log('Error: '+result.msg);
		}
	});
}