'use strict'


function showViajes(){
    getViajes().then(function(data){
        console.log(data);
    });
}

function getViajes(){
    let hola = 0;
    return REQUEST(`${routeApi}Viaje`);
}