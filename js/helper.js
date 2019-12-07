'use strict'
const routeApi = 'http://localhost:3000/';

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