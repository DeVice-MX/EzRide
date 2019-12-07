'use strict'

function getHistorial(){
    return REQUEST(`${routeApi}viaje?idUsuaurio=1`,"GET");
}

function getViaje(idViaje){
    return REQUEST(`${routeApi}Viaje/${idViaje}`);
}

async function getPasajerosViaje(idViaje){
    let viaje = await REQUEST(`${routeApi}Viaje/${idViaje}`);
    let pasajerosEnRuta = viaje.pasajeroEnRuta.map(x=> x.idPasajero);
    let usuarios = await REQUEST(`${routeApi}Usuario/`);
    let pasajeros = usuarios.filter(x=> pasajerosEnRuta.includes(x.id));
    return pasajeros;
}