$(function(){

	//Ajax tabla matrices
	$.ajax({
		type: 'post',
		url: '../controller/ctrmatriz.php',
		data: {
			action: 'tabla_matriz',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<table class="table table-striped table-bordered display" id="tabla_matriz">';
			html += '<thead>';
			html += '<tr>';
			html += '<th>ID MATRIZ</th>';
			html += '<th>EMPRESA</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th>ESTADO</th>';
			html += '<th>ACCIONES</th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.empresa+'</td>';
				html += '<td>'+row.campana+'</td>';
				html += '<td>'+row.estado+'</td>';
				html += '<td>';
				if(row.estado != 'anulado'){
					html += '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" title="Ver" onclick="javascript: ver_matriz(\''+row.id+'\');">';
					html += '<span class="glyphicon glyphicon-eye-open"></span>';
					html += '</button>';
					html += ' ';
					html += '<button type="button" class="btn btn-success btn-sm" data-toggle="tooltip" title="Modificar" onclick="javascript: pageContent(\'administrador/matrices/form\',\'accion_matriz=modificar&id_matriz='+row.id+'\');">';
					html += '<span class="glyphicon glyphicon-pencil"></span>';
					html += '</button>';
					html += ' ';
					html += '<button type="button" class="btn btn-warning btn-sm" data-toggle="tooltip" title="Anular" onclick="javascript: estado_matriz(\''+row.id+'\',\'anulado\');">';
					html += '<span class="glyphicon glyphicon-ban-circle"></span>';
					html += '</button>';
					html += ' ';
					html += '<button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" title="Eliminar" onclick="javascript: estado_matriz(\''+row.id+'\',\'eliminado\');">';
					html += '<span class="glyphicon glyphicon-remove"></span>';
					html += '</button>';
				}
				html += '</td>';
				html += '</tr>';
			});
			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>ID MATRIZ</th>';
			html += '<th>EMPRESA</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th>ESTADO</th>';
			html += '<th>ACCIONES</th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';

			$('#data_matriz').html(html);
			$('[data-toggle="tooltip"]').tooltip({
				"container": "body", 
			});

			$('#tabla_matriz').dataTable({
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
		} else {
			console.log('Error: '+result.msg);
		}
	});
	
});

function ver_matriz(id){
	$('#info_matriz').modal();
	$.ajax({
		type: 'post',
		url: '../controller/ctrmatriz.php',
		data: {
			action: 'data_matriz',
			id: id
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$('#id_matriz').html(row.id);
				$('#nombre_empresa').html(row.empresa);
				$('#nombre_campana').html(row.campana);
				$('#estado_matriz').html(row.estado);
				$.ajax({
					type: 'post',
					url: '../controller/ctrmonitoreo.php',
					data: {
						action: 'tipo_error',
						id_matriz: row.id
					},
					dataType: 'json'
				}).done(function(result2){
					if(result2.bool){
						
						var data2 = $.parseJSON(result2.msg);
						var html = '';
						$.each(data2, function(j, row2){
							j = j+1;
							html += '<div class="panel panel-primary">';
							html += '<div class="panel-heading">';
							html += '<div class="row">';
							html += '<div class="col col-md-6"><p><b>TIPO DE ERROR '+j+': </b> '+row2.tipo_error+'</p></div>';
							html += '<div class="col col-md-6">';
							html += '<p><b>CALCULO ERROR: </b> ';
							var calculo_valor = "";
							if(row2.calculo_valor == 'por'){
								calculo_valor = "Porcentual";
							} else {
								calculo_valor = "Sumatorio";
							}
							html += calculo_valor+'</p>';
							html += '</div>';
							html += '</div>';
							html += '</div>';
							html += '<div class="panel-body" id="vista_items_'+row2.id_error+'">';
							$.ajax({
								type: 'post',
								url: '../controller/ctrmonitoreo.php',
								data: {
									action: 'item_error',
									id_matriz: row.id,
									id_error: row2.id_error
								},
								dataType: 'json'
							}).done(function(result3){
								var data3 = $.parseJSON(result3.msg);
								var html2 = '';
								$.each(data3, function(k, row3){
									k = k+1;
									html2 += '<div class="panel panel-success">';
									html2 += '<div class="panel-heading">';
									html2 += '<div class="row">';
								    html2 += '<div class="col-md-6"><b>ITEM '+k+':</b> '+row3.item+'</div>';
								    html2 += '<div class="col-md-6"><b>VALOR:</b> '+row3.valor+' %</div>';
								    html2 += '</div>';
									html2 += '</div>';
									html2 += '<div class="panel-body">';
									html2 += '<ul id="puntos_item_'+row3.id+'">';
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
										$.each(data4, function(l, row4){
											l = l+1;
											html3 += '<li style="color: #145A32;"><b>PUNTO ENTRENAMIENTO '+l+':</b> '+row4.punto_entrenamiento+'</li>';
										});
										$('#puntos_item_'+row3.id).html(html3);
									});
									html2 += '</ul>';
									html2 += '</div>';
									html2 += '</div>';
								});
								$('#vista_items_'+row2.id_error).html(html2);
							});
							html += '</div>';
							html += '</div>';
						});

						$('#vista_matriz').html(html);
					} else {
						console.log('Error: '+result2.msg);
					}
				});
			});


		} else {
			console.log('Error: '+result.msg);
		}
	});
}

function estado_matriz(id, estado){
	$.ajax({
		type: 'post',
		url: '../controller/ctrmatriz.php',
		data: {
			action: 'monitoreos_matriz',
			id_matriz: id,
		},
		dataType: 'json',
	}).done(function(result){
		if(result.bool){
			switch(estado){
				case 'anulado':
					if(result.msg == '0'){
						$.ajax({
							type: 'post',
							url: '../controller/ctrmatriz.php',
							data: {
								action: 'estado_matriz',
								id: id,
								estado: estado
							},
							dataType: 'json'
						}).done(function(result3){
							if(result3.bool){
								swal({
									title: "Correcto!",
									text: result3.msg,
									type: 'success',
									showCancelButton: false,
									confirmButtonClass: "btn-success",
									confirmButtonText: "Aceptar",
									closeOnConfirm: true,
								},function(){
									pageContent('administrador/matrices/index');
								});
							} else {
								swal('Error!',result3.msg,'error');
								console.log('Error: '+result3.msg);
							}
						});
					} else {
						swal({
							title: "¡Atención!",
							text: "La matriz tiene monitores asignados y realizados \n Desea continuar?",
							type: 'warning',
							showCancelButton: true,
							confirmButtonColor: 'btn-primary',
							cancelButtonColor: 'btn-danger',
							confirmButtonText: 'Aceptar',
							cancelButtonText: "Cancelar",
							closeOnConfirm: false,
						},function(result2){
							$.ajax({
								type: 'post',
								url: '../controller/ctrmatriz.php',
								data: {
									action: 'estado_matriz',
									id: id,
									estado: estado
								},
								dataType: 'json'
							}).done(function(result3){
								if(result3.bool){
									swal({
										title: "Correcto!",
										text: result3.msg,
										type: 'success',
										showCancelButton: false,
										confirmButtonClass: "btn-success",
										confirmButtonText: "Aceptar",
										closeOnConfirm: true,
									},function(){
										pageContent('administrador/matrices/index');
									});
								} else {
									swal('Error!',result3.msg,'error');
									console.log('Error: '+result3.msg);
								}
							});
						});	
					}
				break;
				case 'eliminado':
					if(result.msg == '0'){
						$.ajax({
							type: 'post',
							url: '../controller/ctrmatriz.php',
							data: {
								action: 'estado_matriz',
								id: id,
								estado: estado
							},
							dataType: 'json'
						}).done(function(result3){
							if(result3.bool){
								swal({
									title: "Correcto!",
									text: result3.msg,
									type: 'success',
									showCancelButton: false,
									confirmButtonClass: "btn-success",
									confirmButtonText: "Aceptar",
									closeOnConfirm: true,
								},function(){
									pageContent('administrador/matrices/index');
								});
							} else {
								swal('Error!',result3.msg,'error');
								console.log('Error: '+result3.msg);
							}
						});
					} else {
						swal("Atención!","La matriz tiene monitoreos realizados\n No puede ser eliminada","warning");
					}
				break;
			}
		} else {
			console.log('Error: '+result.msg);
		}
	});
}