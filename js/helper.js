'use strict'
const routeApi = 'http://localhost:3000/';
/*GETS-----------------------------------------*/
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
