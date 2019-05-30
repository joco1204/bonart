$(function(){
	$.ajax({
		type: 'post', 
		url: '../controller/ctragendamonitoreo.php',
		data: {
			action: 'info_asesor',
			id_asesor: $('#id_asesor').val(),
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$('#nombre_asesor').html(row.nombres+' '+row.apellidos);
				$('#identificacion_asesor').html(row.identificacion);
				$('#campana_asesor').html(row.empresa.toUpperCase()+' - '+row.campana.toUpperCase());
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$.ajax({
		type: 'post', 
		url: '../controller/ctragendamonitoreo.php',
		data: {
			action: 'count_monitoreos_asesor',
			id_empresa: $('#id_empresa').val(),
			id_campana: $('#id_campana').val(),
			id_asesor: $('#id_asesor').val()
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$('#count_fechas').val(row.num_monitores);
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});

	$.ajax({
		type: 'post', 
		url: '../controller/ctragendamonitoreo.php',
		data: {
			action: 'monitoreos_asesor',
			id_empresa: $('#id_empresa').val(),
			id_campana: $('#id_campana').val(),
			id_asesor: $('#id_asesor').val()
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var html = '';
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				i = i+1;
				html += '<div class="panel panel-primary fecha_mon">';
				html += '<div class="panel-heading">';
				html += '<p><b>Fecha # '+i+'</b></p>';
				html += '</div>';
				html += '<div class="panel-body">';
				html += '<div class="row">';
				html += '<div class="col col-md-3">';
				html += '<div class="form-group">';
				html += '<label for="fecha_'+i+'" class="control-label">Fecha: </label>';
				html += '</div>';
				html += '</div>';
				html += '<div class="col col-md-6">';
				html += '<input type="text" id="fecha_'+i+'" name="fecha_'+i+'" class="form-control" value="'+row.fecha_monitoreo+'" disabled="">';
				html += '</div>';
				html += '<div class="col col-md-3">';


				if(row.estado == '0'){
					
					if(row.fecha_monitoreo == $('#date').val()){
						html += ' ';
						html += '<button type="button" class="btn btn-warning btn-sm" title="Evaluar" onclick="javascript: pageContent(\'analista/monitoreo\',\'id_empresa='+$('#id_empresa').val()+'&id_campana='+$('#id_campana').val()+'&id_asesor='+$('#id_asesor').val()+'&id_agenda='+row.id+'\');">';
						html += '<span class="glyphicon glyphicon-ok"></span>';
						html += '</button>';
					}

					if($('#id_perfil').val() == '1' || $('#id_perfil').val() == '2'){
						html += ' ';
						html += '<button type="button" class="btn btn-danger btn-sm" title="Anular" onclick="javascript: anular_monitoreo(\''+row.id+'\');">';
						html += '<span class="glyphicon glyphicon-ban-circle"></span>';
						html += '</button>';	
					}

				} else if(row.estado == '1'){
					
					html += ' ';
					html += '<button type="button" class="btn btn-primary btn-sm" title="Ver" onclick="javascript: pageContent(\'analista/vista_monitoreo\',\'id_empresa='+$('#id_empresa').val()+'&id_campana='+$('#id_campana').val()+'&id_agenda='+row.id+'&id_asesor='+$('#id_asesor').val()+'\');">';
					html += '<span class="glyphicon glyphicon-eye-open"></span>';
					html += '</button>';

					if($('#id_perfil').val() == '1' || $('#id_perfil').val() == '2'){
						html += ' ';
						html += '<button type="button" class="btn btn-danger btn-sm" title="Anular" onclick="javascript: anular_monitoreo(\''+row.id+'\');">';
						html += '<span class="glyphicon glyphicon-ban-circle"></span>';
						html += '</button>';
						
					}

				} else if (row.estado == '2'){
					html += ' ';
					html += '<p><b>ANULADO</b></p>';
				} else {
					html += ' ';
					html += '<p><b>NO DEFINIDO</b></p>';
				}

				html += '</div>';
				html += '</div>';
				html += '<br>';
				html += '<div class="row">';
				html += '<div class="col col-md-12" id="canvas_item_error_'+i+'"></div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
			});

			$('#canvas_fechas').append(html);
		} else {
			console.log('Error: '+result.msg);
		}
	});

});

function addFechaMonitoreo(){
	var html = '';
	if($('#count_fechas').val() == '0'){
		var count = ($('.fecha_mon').length)+1;
	} else {
		var count = parseInt($('#count_fechas').val())+1;
	}
	$('#count_fechas').val(count);
	html += '<form id="form_fechas_monitoreo_'+count+'" autocomplete="off">';
	html += '<div class="panel panel-primary fecha_mon">';
	html += '<div class="panel-heading">';
	html += '<p><b>Fecha # '+count+'</b></p>';
	html += '</div>';
	html += '<div class="panel-body">';
	html += '<div class="row">';
	html += '<div class="col col-md-3">';
	html += '<div class="form-group">';
	html += '<label for="fecha_'+count+'" class="control-label">Fecha: </label>';
	html += '</div>';
	html += '</div>';
	html += '<div class="col col-md-6">';
	html += '<div class="input-group date fecha_monitoreo" data-provide="datepicker" data-date-format="yyyy-mm-dd">';
	html += '<input type="text" id="fecha_'+count+'" name="fecha_'+count+'" class="form-control" placeholder="aaaa-mm-dd">';
	html += '<div class="input-group-addon">';
	html += '<span class="glyphicon glyphicon-th"></span>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '<div class="col col-md-3">';
	html += '<button type="submit" class="btn btn-success btn-sm" title="Guardar">';
	html += '<span class="glyphicon glyphicon-floppy-disk"></span>';
	html += '</button>';	
	html += '</div>';
	html += '</div>';
	html += '<br>';
	html += '<div class="row">';
	html += '<div class="col col-md-12" id="canvas_item_error_'+count+'"></div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</form>';

	$('#canvas_fechas').append(html);
	$("select").select2();
	var date = new Date();
	var dd 		= date.getDate();
	var mm_ini 	= $('#mes').val()-1;
	var mm_end 	= $('#mes').val();
	var yyyy = $('#anio').val();
	var date_ini = new Date(yyyy, mm_ini, dd);
	var date_end = new Date(yyyy, mm_end, 0);
	$.fn.datepicker.dates['es'] = {
		days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
		daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		today: "Hoy",
		clear: "Borrar",
		format: "yyyy-mm-dd",
		titleFormat: "MM yyyy",
	};
	$('.fecha_monitoreo').datepicker({
		pickTime: true,
		autoclose: true,
		language: 'es',
		opens: "center",
		startDate: date_ini,
		endDate: date_end,
	});
	$('#form_fechas_monitoreo_'+count).submit(function(e){
		e.preventDefault();
		var fecha = $('#fecha_'+count).val();
		if(fecha == ''){
			swal("Atención!","La fecha se encuentra vacía","warning");
		} else {
			swal({
				title: "¡Atención!",
				text: "Confirma que desea agendar el monitoreo \n para el día "+fecha,
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: 'btn-primary',
				cancelButtonColor: 'btn-danger',
				confirmButtonText: 'Aceptar',
				cancelButtonText: "Cancelar",
				closeOnConfirm: false,
			},function(){
				$.ajax({
					type: 'post', 
					url: '../controller/ctragendamonitoreo.php',
					data: {
						action: 'guardar_fecha_monitoreo',
						id_empresa: $('#id_empresa').val(),
						id_campana: $('#id_campana').val(),
						id_asesor: $('#id_asesor').val(),
						nombre: sessionStorage.getItem('nombre')+" "+sessionStorage.getItem('apellido1'), 
						email: sessionStorage.getItem('email'), 
						fecha_monitoreo: $('#fecha_'+count).val()
					},
					dataType: 'json'
				}).done(function(result){
					if(result.bool){
						swal({
							title: "¡Correcto!",
							text: "Se ha agendado el monitoreo corectamente",
							type: 'success',
							showCancelButton: false,
							confirmButtonClass: "btn-success",
							confirmButtonText: "Aceptar",
							closeOnConfirm: true,
						},function(){
							pageContent('analista/agenda_monitoreo','id_empresa='+$('#id_empresa').val()+'&id_campana='+$('#id_campana').val()+'&id_asesor='+$('#id_asesor').val());
						});
					} else {
						console.log('Error: '+result.msg);
					}
				});
			});		
		}
	});
}

function anular_monitoreo(id){
	swal({
		title: "¡Atención!",
		text: "Comfirma anular este monitoreo?",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: 'btn-primary',
		cancelButtonColor: 'btn-danger',
		confirmButtonText: 'Aceptar',
		cancelButtonText: "Cancelar",
		closeOnConfirm: false,
	},function(){
		$.ajax({
			type: 'post', 
			url: '../controller/ctragendamonitoreo.php',
			data: {
				action: 'anular_monitoreo',
				id_genda: id
			},
			dataType: 'json'
		}).done(function(result){
			if(result.bool){
				swal({
					title: "¡Correcto!",
					text: result.msg,
					type: 'success',
					showCancelButton: false,
					confirmButtonClass: "btn-success",
					confirmButtonText: "Aceptar",
					closeOnConfirm: true,
				},function(){
					pageContent('analista/agenda_monitoreo','id_empresa='+$('#id_empresa').val()+'&id_campana='+$('#id_campana').val()+'&id_asesor='+$('#id_asesor').val());
				});
			} else {
				console.log('Error: '+result.msg);
			}
		});
	});	

}
