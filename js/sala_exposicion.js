$(function(){

	//Ajax tabla kardex
	$.ajax({
		type: 'post',
		url: '../controller/ctrsalaexposicion.php',
		data: {
			action: 'consultar',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<table class="table table-striped table-bordered display" id="tabla_sala_exposicion">';
			html += '<thead>';
			html += '<tr>';
			html += '<th>ID</th>';
			html += '<th>SALA</th>';
			html += '<th>VENDEDOR ENCARGADO</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';

			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.sala+'</td>';
				html += '<td>'+row.vendedor+'</td>';
				html += '<td><button type="button" class="btn btn-success btn-sm" title="Modificar"><span class="glyphicon glyphicon-pencil"></span></button></td>';
				html += '</tr>';
			});

			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>ID</th>';
			html += '<th>SALA</th>';
			html += '<th>VENDEDOR ENCARGADO</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';

			$('#data_sala_exposicion').html(html);

			$('#tabla_sala_exposicion').dataTable({
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

	$('#crear_sala').click(function(){
		$.ajax({
			type: 'post',
			url: '../controller/ctrusuarios.php',
			data: {
				action: 'lista_vendedor',
			},
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				var data = $.parseJSON(result.msg);
				$('#vendedor').append($('<option>', {
					value: '',
					text: '', 
				}));	
				$.each(data, function(i, row){
					$('#vendedor').append($('<option>', {
						value: row.id,
						text: row.vendedor, 
					}));					
				});
			} else {
				console.log('Error: '+result.msg);
			}
		});
	});

	$('#crear').submit(function(e){
		e.preventDefault();
		var data = $(this).serialize();
		$.ajax({
			type: 'post',
			url: '../controller/ctrsalaexposicion.php',
			data: data,
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				$('#crear_sala_exposicion').modal().hide();
				$("#crear_sala_exposicion .close").click();
				swal({
					title: "Correcto!",
					text: result.msg,
					type: 'success',
					showCancelButton: false,
					confirmButtonClass: "btn-success",
					confirmButtonText: "Aceptar",
					closeOnConfirm: true,
				},function(){
					pageContent('admin/sala_exposicion/index');
				});
			} else {

				swal('Error!',result.msg,'error');
				console.log('Error: '+result.msg);
			}
		});
	});

});