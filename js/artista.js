$(function(){

//Ajax tabla kardex
	$.ajax({
		type: 'post',
		url: '../controller/ctrartista.php',
		data: {
			action: 'consultar',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<table class="table table-striped table-bordered display" id="tabla_artista">';
			html += '<thead>';
			html += '<tr>';
			html += '<th>ID</th>';
			html += '<th>TIPO IDENTIFICACIÓN</th>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE</th>';
			html += '<th>DIRECCIÓN</th>';
			html += '<th>TELÉFONOS</th>';
			html += '<th>PAIS</th>';
			html += '<th>CIUDAD</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';

			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.tipo_identificacion+'</td>';
				html += '<td>'+row.identificacion+'</td>';
				html += '<td>'+row.nombre+'</td>';
				html += '<td>'+row.direccion+'</td>';
				html += '<td>'+row.telefonos+'</td>';
				html += '<td>'+row.pais+'</td>';
				html += '<td>'+row.ciudad+'</td>';
				html += '<td><button type="button" class="btn btn-success btn-sm" title="Modificar"><span class="glyphicon glyphicon-pencil"></span></button></td>';
				html += '</tr>';
			});

			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>ID</th>';
			html += '<th>TIPO IDENTIFICACIÓN</th>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE</th>';
			html += '<th>DIRECCIÓN</th>';
			html += '<th>TELÉFONOS</th>';
			html += '<th>PAIS</th>';
			html += '<th>CIUDAD</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';

			$('#data_artista').html(html);

			$('#tabla_artista').dataTable({
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