'use strict'
const routeApi = 'https://ezride-db.herokuapp.com/';

async function REQUEST(url, method, jParams) {
    let options = {
        method: method
    };
    if (method != 'GET') {
        options['headers'] = { 'Content-Type': 'application/json' };
        options['body'] = JSON.stringify(jParams);
    }
    let response = await fetch(url, options);
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        //var jsonSwal = enumSwal.error[getCookie("idioma")];
        //swal(jsonSwal).then(function () {

        //});
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function initMenu() {
    if (getCookie("tipoUsuario") == "Conductor") {
        $("a[data-name='perfil']").attr("href", "/html/perfilConductor.html");
        $("a[data-name='viaje']")
            .html("Generar viaje")
            .attr("href", "/html/RouteMap.html");

    }
    else {
        $("a[data-name='perfil']").attr("href", "/html/perfilPasajero.html");
        $("a[data-name='viaje']")
            .html("Buscar viaje")
            .attr("href", "/html/RouteMap.html");

    }

    $("a[data-name='cerrar-sesion']").click(function (){
        window.location = "/html/login.html";
    });
}