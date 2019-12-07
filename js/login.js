$(function () {
    var form = $("#login");

    form.validate({
        lang: 'es'  // or whatever language option you have.
    });

    $("#btn-submitLogin").click(function () {
        if (form.valid()) {
            let jParams = {
                nombreUsuario: $("#name").val().replace(" ", "+"),
                contrasena: $("#password").val()
            };

            getUsuario(jParams).then((usuario) => {
                if (usuario.length > 0){
                    Toast.fire({
                        icon: 'success',
                        title: 'Inicio de sesión exitoso'
                    });
                    usuario = usuario[0];

                    setCookie("idUsuario",usuario.id);

                    if(usuario.tipo == "Conductor"){
                        setCookie("tipoUsuario","Conductor");
                        window.location="/html/perfilConductor.html";
                    }
                    else{
                        setCookie("tipoUsuario","Pasajero");
                        window.location="/html/perfilUsuario.html";
                    }
                }
                else
                    Toast.fire({
                        icon: 'error',
                        title: 'Verifique usuario y contraseña'
                    });
            });
        }
    });
});