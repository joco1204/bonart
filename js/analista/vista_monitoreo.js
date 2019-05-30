$(function(){

	$.ajax({
		type: 'post',
		url: '../controller/ctrmonitoreo.php',
		data: {
			action : 'vista_monitoreo',
			id_agenda: $('#id_agenda').val(),
			id_asesor: $('#id_asesor').val()
		},
		dataType: 'json',
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			$.each(data, function(i, row){
				$('#id_monitoreo').html(row.id_monitoreo);
				$('#num_monitoreo').val(row.id_monitoreo);
				$('#fecha_llamada').html(row.fecha_llamada);
				$('#cedula').html(row.identificacion);
				$('#hora_llamada').html(row.hora_llamada);
				$('#asesor').html(row.asesor);
				$('#analista').html(row.analista);
				$('#tipificacion').html(row.tipificacion);
				$('#id_llamada').html(row.id_llamada);
				$('#observacion').html(row.observacion);
				$('#solucion').html(row.solucion);
				$('#fallas_audio').html(row.fallas_audio);
				$('#fecha_registro').html(row.fecha_registro);
				$('#fecha_modificacion').html(row.fecha_modificacion);

				$.ajax({
					type: 'post', 
					url: '../controller/ctrmonitoreo.php',
					data: {
						action: 'vista_monitoreo_error', 
						id_monitoreo: $('#num_monitoreo').val(), 
					},
					dataType: 'json',
				}).done(function(result2){
					if(result2.bool){
						var data2 = $.parseJSON(result2.msg);
						var html = '';

						$.each(data2, function(i, row2){
							html += '<div class="panel panel-primary">';
							html += '<div class="panel-heading">'+row2.tipo_error+'</div>';
							html += '<div class="panel-body" id="item_error_'+row2.id_error+'">';
							html += '<ul>';

							$.ajax({
								type: 'post', 
								url: '../controller/ctrmonitoreo.php',
								data: {
									action: 'vista_monitoreo_items', 
									id_monitoreo: $('#num_monitoreo').val(), 
									id_error: row2.id_error, 
								},
								dataType: 'json',
							}).done(function(result3){
								if(result3.bool){
									var data3 = $.parseJSON(result3.msg);
									var html2 = '';
									$.each(data3, function(i, row3){
										html2 += '<div class="row">';
										html2 += '<div class="col-md-4">';
										html2 += '<li type="disc">';
										html2 += '<label><b>ITEM:</b></label>';
										html2 += '<label><p>'+row3.item_error+'</p></label>';
										html2 += '</div>';

										if(row3.valor_porcentaje_cumplimiento == '0'){
											html2 += '<div class="col-md-2 bg-red">';
											html2 += '<label><b>VALOR: </b></label> ';
											html2 += '<label><p>'+row3.valor_porcentaje_cumplimiento+' %</p></label>';
											html2 += '</div>';
										} else {
											html2 += '<div class="col-md-2 bg-green">';
											html2 += '<label><b>VALOR: </b></label> ';
											html2 += '<label><p>'+row3.valor_porcentaje_cumplimiento+' %</p></label>';
											html2 += '</div>';
										}

										if(row3.punto_entrenamiento != ''){
											html2 += '<div class="col-md-6">';
											html2 += '<label><b>PUNTO ENTRENAMIENTO:</b> </label>';
											html2 += '<label><p>'+row3.punto_entrenamiento+'</p></label> ';
											html2 += '</div>';
										} else {
											html2 += '<div class="col-md-6">';
											html2 += '<label><b>PUNTO ENTRENAMIENTO:</b></label>';
											html2 += '</div>';
										}
										html2 += '</li>';
										html2 += '</div>';
										html2 += '<hr>';
										
									});
								} else {
									console.log('Error: '+result3.msg);
								}
								$('#item_error_'+row2.id_error).html(html2);
							});
							html += '</ul>';
							html += '</div>';
							html += '</div>';
						});

						$('#detalle_monitoreo').html(html);
					} else {
						console.log('Error: '+result2.msg);
					}

				});

				$.ajax({
					type: 'post',
					url: '../controller/ctrmonitoreo.php',
					data: {
						action : 'total_monitoreo_vista',
						id_mon: $('#num_monitoreo').val(),
					},
					dataType: 'json',
				}).done(function(result){
					if(result.bool){
						var data = $.parseJSON(result.msg);
						var html = '';
						$.each(data, function(i, row){
							html += '<div class="row">';
							html += '<div class="col col-md-8 text-left">';
							html += '<b>'+row.error+': </b>';
							html += '</div>';
							
							if(row.valor_porcentaje_cumplimiento == '0'){
								html += '<div class="col col-md-3 text-right bg-red">';
								html += row.valor_porcentaje_cumplimiento+' %';
								html += '</div>';
							} else if(row.valor_porcentaje_cumplimiento == '100'){
								html += '<div class="col col-md-3 text-right bg-green">';
								html += row.valor_porcentaje_cumplimiento+' %';
								html += '</div>';
							} else {
								html += '<div class="col col-md-3 text-right bg-yellow">';
								html += row.valor_porcentaje_cumplimiento+' %';
								html += '</div>';
							}
							html += '<div class="col col-md-1"></div>';
							html += '</div>';
							html += '<br>';
						});
					} else {
						console.log('Error: '+result.msg);
					}
					$('#total_monitoreos').html(html)
				});
			});
		} else {
			console.log('Error: '+result.msg);
		}
	});	
});




