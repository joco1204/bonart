//Function to load the content of each module
var pageContent = function(page, settings){
	sessionStorage.setItem("navigator", page);
	//Valid whether the configuration parameters are defined or not
	if (settings === undefined || settings === null || settings  === ''){
		//Make the page load in the container
		$("#contenido-index").load(page+".php", function(response, status, xhr){
			//Valid if the status of the file's upload is correct or not
			if (status == "error"){
				$("#contenido-index").load("config/error.php");
			}
		});
	} else {
		try{
			var params 	= JSON.parse(settings);
			var bool 	= true;
		} catch(e){
			var params 	= settings;
			var bool 	= false;
		}
		//Make the page load in the container
		$("#contenido-index").load(page+".php", params, function(response, status, xhr){
			//Valid if the status of the file's upload is correct or not
			if(status == "error"){
				$("#contenido-index").load("config/error.php");
			} else {
				//Validate that the Boolean variable is true
				if (bool){
					//The parameters are loaded in the form
					if(params.length){
						$.each(params, function(n, v){
							if ($("[name="+n+"]").length){
								$("[name="+n+"]").val(v);
							}
						});
					}
				}
			}
		});
	}
}
//Remove Session Storage 
var removeSession = function(){
	sessionStorage.removeItem('id_usaurio');
	sessionStorage.removeItem('usuario');
	sessionStorage.removeItem('id_perfil');
	sessionStorage.removeItem('perfil');
	sessionStorage.removeItem('nombre');
	sessionStorage.removeItem('apellido1');
	sessionStorage.removeItem('apellido2');
	sessionStorage.removeItem('tipo_identificacion');
	sessionStorage.removeItem('identificacion');
	sessionStorage.removeItem('email');
	sessionStorage.removeItem('estado');
	sessionStorage.removeItem('token');
	sessionStorage.clear();
}
//Function to close session of the application
var logout = function(){
	$.ajax({
		type: "POST", 
		url: "../controller/ctrlogout.php",
		data: {
			action: 'logout',
		},
		dataType: 'json'
	}).done(function(result){
		if (result.bool){
			window.location.href = "../../";
			//removeSession();
		} else {
			console.log('Error: '+result.msg)
		}
	});	
};

//Start timeout
var timeout;
function startTimeOut() {
	timeout = setTimeout(function(){redirectTimeOut()}, 1200000);
}

function stopTimeOut() {
	clearTimeout(timeout);
	timeout = setTimeout('location="../../"', 1200000);
	sessionStorage.removeItem('id_usaurio');
	sessionStorage.removeItem('usuario');
	sessionStorage.removeItem('id_perfil');
	sessionStorage.removeItem('perfil');
	sessionStorage.removeItem('nombre');
	sessionStorage.removeItem('apellido1');
	sessionStorage.removeItem('apellido2');
	sessionStorage.removeItem('tipo_identificacion');
	sessionStorage.removeItem('identificacion');
	sessionStorage.removeItem('email');
	sessionStorage.removeItem('estado');
	sessionStorage.removeItem('token');
	sessionStorage.clear();
}

//
function redirectTimeOut(){
	$.ajax({
		type: "POST", 
		url: "../controller/ctrlogout.php",
		data: {
			action: 'logout',
		},
		dataType: 'json',
	}).done(function(result){
		if (result.bool){
			window.location.href = "../../";
			//removeSession();	
		} else {
			console.log('Error: '+result.msg)
		}
	});	
}

