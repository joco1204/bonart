$(function(){

	$.ajax({
		type: 'post',
		url: '../controller/ctrtaquilla.php',
		data: {
			action: 'consultar',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<table class="table table-striped table-bordered display" id="tabla_taquilla">';
			html += '<thead>';
			html += '<tr>';
			html += '<th>ID</th>';
			html += '<th>MENU</th>';
			html += '<th>MESA</th>';
			html += '<th>PRECIO TOTAL</th>';
			html += '<th>ESTADO</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';

			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.menu+'</td>';
				html += '<td>'+row.numero_mesa+'</td>';
				html += '<td>'+row.precio_total+'</td>';
				html += '<td>'+row.estado+'</td>';
				html += '<td><button type="button" class="btn btn-success btn-sm" title="Modificar"><span class="glyphicon glyphicon-pencil"></span></button></td>';
				html += '</tr>';
			});

			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>ID</th>';
			html += '<th>MENU</th>';
			html += '<th>MESA</th>';
			html += '<th>PRECIO TOTAL</th>';
			html += '<th>ESTADO</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';

			$('#data_taquilla').html(html);

			$('#tabla_taquilla').dataTable({
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

});