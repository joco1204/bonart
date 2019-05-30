$(function(){

	$.ajax({
		type: 'post', 
		url: '../controller/ctrcampanas.php',
		data: {
			action: 'campanas_analista',
			id_empresa: $('#id_empresa').val(),
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = "";

			html += '<div class="row text-center">';
			$.each(data, function(i, row){
				var i=i+1;
				html += '<div class="col-lg-3 text-center">';
				html += '<div class="small-box bg-blue" onclick="javascript: pageContent(\'analista/plan_monitoreo\',\'id_empresa='+$('#id_empresa').val()+'&id_campana='+row.id+'\');" style="cursor:pointer; height: 150px;">';
				html += '<div class="inner">';
				html += '<h2>'+i+'</h2>';
				html += '<p><b>'+row.campana.toUpperCase()+'</b></p>';
				html += '</div>';
				html += '</div>';
				html += '</div>';

				if(i%4 == 0){
					html += '</div><div class="row">';
				}
			});
			html += '</div>';
			$('#container_panel').html(html);
		} else {
			console.log('Error: '+result.msg);
		}
	});
});