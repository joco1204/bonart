$(function(){
	$.ajax({
		type: 'post', 
		url: '../controller/ctrempresas.php',
		data: {
			action: 'empresa_analista',
		},
		dataType: 'json'
	}).done(function(result){
		if(result.bool){
			var data = $.parseJSON(result.msg);
			var html = "";

			html += '<div class="row text-center">';
			$.each(data, function(i, row){
				var i=i+1;
				var empresa = $('#empresa').val();
				if(empresa == 0){
					html += '<div class="col-lg-3 text-center">';
					html += '<div class="small-box bg-blue" onclick="javascript: pageContent(\'analista/campanas\',  \'id_empresa='+row.id+'&empresa='+row.empresa+'\');" style="cursor:pointer; height: 250px;">';
					html += '<div class="inner">';
					html += '<h2>'+i+'</h2>';
					html += '<p><b>'+row.empresa.toUpperCase()+'</b></p>';
					if(row.imagen != ''){
						html += '<center><img src="'+row.imagen+'" class="img-responsive img-rounded" alt="'+row.empresa+'" style="width: 130px; height: 130px;"></center>';
					}
					html += '</div>';
					html += '</div>';
					html += '</div>';

					if(i%4 == 0){
						html += '</div><div class="row">';
					}
				} else {
					if(empresa == row.id){
						$('#nombre_empresa').html(row.empresa.toUpperCase());
						
						html += '<div class="col-lg-3 text-center">';
						html += '<div class="small-box bg-blue" onclick="javascript: pageContent(\'analista/campanas\',  \'id_empresa='+row.id+'&empresa='+row.empresa+'\');" style="cursor:pointer; height: 250px;">';
						html += '<div class="inner">';
						html += '<h2>'+i+'</h2>';
						html += '<p><b>'+row.empresa.toUpperCase()+'</b></p>';
						if(row.imagen != ''){
							html += '<center><img src="'+row.imagen+'" class="img-responsive img-rounded" alt="'+row.empresa+'" style="width: 130px; height: 130px;"></center>';
						}
						html += '</div>';
						html += '</div>';
						html += '</div>';
						if(i%4 == 0){
							html += '</div><div class="row">';
						}
					}
				}

					
			});
			html += '</div>';
			$('#container_panel').html(html);
		} else {
			console.log('Error: '+result.msg);
		}
	});



});