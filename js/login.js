$(function(){
	$('#login').submit(function(e){
		e.preventDefault();
		//Ajax that executes the login
		if ($('#user').val() != "" && $('#pass').val() != ""){
			$.ajax({
				type: 'POST',
				url: 'app/controller/ctrlogin.php',
				data: {
						action: 'login',
						user: $('#user').val(), 
						pass: $('#pass').val()
					},
				dataType: 'json'
			}).done(function(result){
				if(result.bool){
					var data = $.parseJSON(result.msg);
					//Ajax building the session
					$.ajax({
						type: 'POST',
						url: 'app/controller/ctrlogin.php',
						data: {
								action: 'session',
								iduser: data.iduser,
								token: data.token
							},
						dataType: 'json'
					}).done(function(result2){
						if(result2.bool){
							var data2 = $.parseJSON(result2.msg);
							//Session storage generator
							sessionStorage.setItem('id_usaurio', data2.id_usaurio);
							sessionStorage.setItem('usuario', data2.usuario);
							sessionStorage.setItem('id_perfil', data2.id_perfil);
							sessionStorage.setItem('perfil', data2.perfil);
							sessionStorage.setItem('nombre', data2.nombre);
							sessionStorage.setItem('apellido1', data2.apellido1);
							sessionStorage.setItem('apellido2', data2.apellido2);
							sessionStorage.setItem('tipo_identificacion', data2.tipo_identificacion);
							sessionStorage.setItem('identificacion', data2.identificacion);
							sessionStorage.setItem('estado', data2.estado);
							sessionStorage.setItem('token', data2.token);
							//entry to the platform
							window.location.href = "app/view/index.php";
						} else {
							$('#warning-login').css('display','block');
							$('#warning-login').html(result2.msg);
						}
					});
				} else {
					$('#warning-login').css('display','block');
					$('#warning-login').html(result.msg);
				}
			});
		} else if ($('#user').val() != "" && $('#pass').val() == "") {
			$('#warning-login').css('display','block');
			$('#warning-login').html("Contraseña Incorrecta");
		} else if ($('#user').val() == "" && $('#pass').val() != ""){
			$('#warning-login').css('display','block');
			$('#warning-login').html("Usuario Incorrecto");
		} else {
			$('#warning-login').css('display','block');
			$('#warning-login').html("Usuario y contraseña incorrectos");
		}
	});

	$('#contrasena_form').submit(function(e){
		e.preventDefault();
		if($('#email').val() == ''){
			swal("¡Atención!","Debe ingresar el email para recuperar su contraseña","warning");
		} else {
			var data = $('#contrasena_form').serialize();
			alert(data);
		}
	});

});