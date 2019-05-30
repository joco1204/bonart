$(function(){

	//Ajax tabla matrices
	$.ajax({
		type: 'post',
		url: '../controller/ctrmatriz.php',
		data: {
			action: 'tabla_error',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<table class="table table-striped table-bordered display" id="tabla_error">';
			html += '<thead>';
			html += '<tr>';
			html += '<th>ID</th>';
			html += '<th>TIPO</th>';
			html += '<th>ERROR</th>';
			html += '<th>SIGLAS</th>';
			html += '<th>ESTADO</th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.tipo+'</td>';
				html += '<td>'+row.error+'</td>';
				html += '<td>'+row.siglas+'</td>';
				html += '<td>'+row.estado+'</td>';
				html += '</tr>';
			});

			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>ID</th>';
			html += '<th>TIPO</th>';
			html += '<th>ERROR</th>';
			html += '<th>SIGLAS</th>';
			html += '<th>ESTADO</th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';

			$('#data_error').html(html);

			$('#tabla_error').dataTable({
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
	


	$('#nuevo_error_form').submit(function(e){
		e.preventDefault();
		var data = $(this).serialize();
		$.ajax({
			type: 'post',
			url: '../controller/ctrmatriz.php',
			data: data,
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				$('#nuevo_error').modal().hide();
				$("#nuevo_error .close").click();
				swal({
					title: "Correcto!",
					text: result.msg,
					type: 'success',
					showCancelButton: false,
					confirmButtonClass: "btn-success",
					confirmButtonText: "Aceptar",
					closeOnConfirm: true,
				},function(){
					pageContent('administrador/matrices/tipo_error');
				});
			} else {
				swal('Error!',result.msg,'error');
				console.log('Error: '+result.msg);
			}
		});
	});
});

function nuevoError(){
	$("#nuevo_error").modal();
}