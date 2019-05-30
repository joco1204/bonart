$(function(){
	$.ajax({
		type: 'post', 
		url: '../controller/ctrplanmonitoreo.php',
		data: {
			action: 'empresa_campana',
			id_empresa: $('#id_empresa').val(),
			id_campana: $('#id_campana').val(),
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$('#empresa_nom').html(row.empresa.toUpperCase());
				$('#campana_nom').html(row.campana.toUpperCase());
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$.ajax({
		type: 'post',
		url: '../controller/ctrplanmonitoreo.php',
		data: {
			action: 'monitoreos_dia',
			id_empresa: $('#id_empresa').val(),
			id_campana: $('#id_campana').val(),
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<table class="table table-striped table-bordered display" id="tabla_dia" border="1">';
			html += '<thead>';
			html += '<tr>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE(S)</th>';
			html += '<th>APELLIDO(S)</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th>FECHA MONITOREO</th>';
			html += '<th>EVALUAR</th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.identificacion+'</td>';
				html += '<td>'+row.nombres+'</td>';
				html += '<td>'+row.apellidos+'</td>';
				html += '<td>'+row.empresa+' '+row.campana+'</td>';
				html += '<td>'+row.fecha_monitoreo+'</td>';
				html += '<td class="text-center">';
				html += '<button type="button" class="btn btn-warning btn-md" title="Evaluar" onclick="javascript: pageContent(\'analista/monitoreo\',\'id_empresa='+row.id_empresa+'&id_campana='+row.id_campana+'&id_asesor='+row.id_asesor+'&id_agenda='+row.id_agenda+'\');">';
				html += '<span class="glyphicon glyphicon-ok"></span>';
				html += '</button>';
				html += '</td>';
				html += '</tr>';
			});
			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE(S)</th>';
			html += '<th>APELLIDO(S)</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th>FECHA MONITOREO</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';
			$('#data_dia').html(html);
			$('#tabla_dia').dataTable({
				"order": [ 0, "asc" ],
				"pageLength": 5, 
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

	$.ajax({
		type: 'post',
		url: '../controller/ctrplanmonitoreo.php',
		data: {
			action: 'monitoreos_mes',
			id_empresa: $('#id_empresa').val(),
			id_campana: $('#id_campana').val(),
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = '';
			html += '<table class="table table-striped table-bordered display" id="tabla_mes" border="1">';
			html += '<thead>';
			html += '<tr>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE(S)</th>';
			html += '<th>APELLIDO(S)</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th>FECHA MONITOREO</th>';
			html += '<th>VER MONITOREO</th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.identificacion+'</td>';
				html += '<td>'+row.nombres+'</td>';
				html += '<td>'+row.apellidos+'</td>';
				html += '<td>'+row.empresa+' '+row.campana+'</td>';
				html += '<td>'+row.fecha_monitoreo+'</td>';
				html += '<td class="text-center">';
				html += '<button type="button" class="btn btn-default btn-md" title="Ver" onclick="javascript: pageContent(\'analista/vista_monitoreo\',\'id_empresa='+$('#id_empresa').val()+'&id_campana='+$('#id_campana').val()+'&id_agenda='+row.id_agenda+'&id_asesor='+row.id_asesor+'\');">';
				html += '<span class="glyphicon glyphicon-eye-open"></span>';
				html += '</button>';
				html += '</td>';
				html += '</tr>';
			});
			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE(S)</th>';
			html += '<th>APELLIDO(S)</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th>FECHA MONITOREO</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';
			$('#data_mes').html(html);
			$('#tabla_mes').dataTable({
				"order": [ 1, "asc" ],
				"pageLength": 5, 
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

	$.ajax({
		type: 'post',
		url: '../controller/ctrplanmonitoreo.php',
		data: {
			action: 'tabla_asesor',
			id_empresa: $('#id_empresa').val(),
			id_campana: $('#id_campana').val(),
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
			html += '<th>CAMPAÑA</th>';
			html += '<th>PLAN MONITOREO</th>';
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			$.each(data, function(i, row){
				html += '<tr>';
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.identificacion+'</td>';
				html += '<td>'+row.nombres+'</td>';
				html += '<td>'+row.apellidos+'</td>';
				html += '<td>'+row.empresa.toUpperCase()+' '+row.campana.toUpperCase()+'</td>';
				html += '<td class="text-center">';
				html += '<button type="button" class="btn btn-success btn-md" title="Plan Monitoreo" onclick="javascript: pageContent(\'analista/agenda_monitoreo\',\'id_empresa='+$('#id_empresa').val()+'&id_campana='+$('#id_campana').val()+'&id_asesor='+row.id+'\');">';
				html += '<span class="glyphicon glyphicon-list-alt"></span>';
				html += '</button>';
				html += '</td>';
				html += '</tr>';
			});
			html += '</tbody>';
			html += '<tfoot>';
			html += '<tr>';
			html += '<th>ID ASESOR</th>';
			html += '<th>IDENTIFICACIÓN</th>';
			html += '<th>NOMBRE(S)</th>';
			html += '<th>APELLIDO(S)</th>';
			html += '<th>CAMPAÑA</th>';
			html += '<th></th>';
			html += '</tr>';
			html += '</tfoot>';
			html += '</table>';
			$('#data_asesores').html(html);
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
		} else {
			console.log('Error: '+result.msg);
		}
	});
});