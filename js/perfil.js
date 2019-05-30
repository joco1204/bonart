$(function(){

	$('#form_perfil').submit(function(e){
		e.preventDefault();
		if($('#cambiar_contrasena').val() == '' && $('#repetir_cambiar_contrasena').val() == ''){
			$('#modal_perfil').modal().hide();
			$("#modal_perfil .close").click();
			swal({
				title: "¡Correcto!",
				text: "Perfil de usaurio actualizado con éxito",
				type: 'success',
				showCancelButton: false,
				confirmButtonClass: "btn-success",
				confirmButtonText: "Aceptar",
				closeOnConfirm: true,
			},function(){
				pageContent('contenido');
			});
		} else if($('#cambiar_contrasena').val() != '' && $('#repetir_cambiar_contrasena').val() == ''){
			swal("¡Atención!","Debe repetir la contraseña","warning");
		} else if($('#cambiar_contrasena').val() == '' && $('#repetir_cambiar_contrasena').val() != ''){
			swal("¡Atención!","Debe ingresar la contraseña","warning");
		} else {
			if ($('#cambiar_contrasena').val() == $('#repetir_cambiar_contrasena').val()){
				var data = $(this).serialize();
				$.ajax({
					type: 'post',
					url: '../controller/ctrusuarios.php',
					data: data,
					dataType: 'json'
				}).done(function(result){
					if(result.bool){
						$('#modal_perfil').modal().hide();
						$("#modal_perfil .close").click();
						swal({
							title: "¡Correcto!",
							text: result.msg,
							type: 'success',
							showCancelButton: false,
							confirmButtonClass: "btn-success",
							confirmButtonText: "Aceptar",
							closeOnConfirm: true,
						},function(){
							pageContent('contenido');
						});
					} else {
						console.log('Error: '+result.msg);
					}
				});
			} else {
				swal("¡Error!","Las contraseñas digitadas no coinciden","error");
			}
		}
	});
});