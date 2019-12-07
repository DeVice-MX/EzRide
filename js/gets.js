'use strict'

function getHistorial(params) {
    return REQUEST(`${routeApi}${params}`, "GET");
}

async function getViajesProgramadosP(params) {
    let viajes = await  REQUEST(`${routeApi}Viaje?status=PENDIENTE`, "GET");
    
    let viajesxPasajero = viajes.filter(x=> x.pasajerosEnRuta.map(p=> parseInt(p.idPasajero)).includes(parseInt(params.idUsuario)));
    return viajesxPasajero;
}

async function getViajesProgramadosC(params) {
    let viajes = await  REQUEST(`${routeApi}Viaje?idUsuario=${params.idUsuario}status=PENDIENTE`, "GET");
    return viajes;
}


function getViaje(idViaje) {
    return REQUEST(`${routeApi}Viaje/${idViaje}`);
}

function getUsuario(jParams) {
    return REQUEST(`${routeApi}Usuario?nombreUsuario=${jParams.nombreUsuario}&contrasena=${jParams.contrasena}`);
}

async function getPasajerosViaje(idViaje) {
    let viaje = await REQUEST(`${routeApi}Viaje/${idViaje}`);
    let pasajerosEnRuta = viaje.pasajerosEnRuta.map(x=> x.idPasajero);
    let usuarios = await REQUEST(`${routeApi}Usuario/`);
    let pasajeros = usuarios.filter(x => pasajerosEnRuta.includes(x.id));
    return pasajeros;
}

function saveViaje(jParams) {
    return REQUEST(`${routeApi}Viaje`, 'POST', jParams);
}

async function retrasarViaje(jParams) {
    let viaje = await REQUEST(`${routeApi}Viaje/${jParams.idViaje}`);
    let editJson = {
        idUsuario : viaje.idUsuario,
        origen : viaje.origen,
        destino : viaje.destino,
        pasajerosEnCola : viaje.pasajerosEnCola,
        pasajerosEnRuta : viaje.pasajerosEnRuta,
        status : 'RETRASO', //atributo que se edita
        t_Salida : viaje.t_Salida,
        t_Llegada : viaje.t_Llegada,
        t_Alta : viaje.t_Alta,
        tarifa : viaje.tarifa
    };
    return REQUEST(`${routeApi}Viaje/${jParams.idViaje}`, 'PUT', editJson);
}

async function editPuntajeUsuario(jParams) {
    let viaje = await REQUEST(`${routeApi}Viaje/${jParams.idViaje}`);
    let usuario = await REQUEST(`${routeApi}Usuario/${viaje.idUsuario}`);
    let puntajeActual = usuario.puntaje;
    let puntajeNuevo = puntajeActual += jParams.puntaje;
    let editJson = {
        nombreUsuario: usuario.nombreUsuario,
        contrasena: usuario.contrasena,
        tipo: usuario.tipo,
        puntaje: puntajeNuevo, //atributo que se esta editando
        reputacion: usuario.reputacion,
        infoAuto: usuario.infoAuto,
        recompensas: usuario.recompensas
    }
    return REQUEST(`${routeApi}Usuario/${usuario.id}`, 'PUT', editJson);
}

function saveUsuario(jParams) {
    return REQUEST(`${routeApi}Usuario`, 'POST', jParams);
}

async function upgradeUsuario(jParams) {
    let usuario = await REQUEST(`${routeApi}Usuario/${jParams.idUsuario}`);
    let editJson = {
        nombreUsuario: usuario.nombreUsuario,
        contrasena: usuario.contrasena,
        tipo: usuario.tipo,
        puntaje: usuario.puntaje,
        reputacion: usuario.reputacion,
        infoAuto: jParams.infoAuto, //atributo que se esta editando
        recompensas: usuario.recompensas
    }
    return REQUEST(`${routeApi}Usuario/${usuario.id}`, 'PUT', editJson);
}

async function cancelarViaje(jParams) {
    let viaje = await REQUEST(`${routeApi}Viaje/${jParams.idViaje}`);
    let editJson = {
        idUsuario : viaje.idUsuario,
        origen : viaje.origen,
        destino : viaje.destino,
        pasajerosEnCola : viaje.pasajerosEnCola,
        pasajerosEnRuta : viaje.pasajerosEnRuta,
        status : 'CANCELADO', //atributo que se edita
        t_Salida : viaje.t_Salida,
        t_Llegada : viaje.t_Llegada,
        t_Alta : viaje.t_Alta,
        tarifa : viaje.tarifa
    };
    return REQUEST(`${routeApi}Viaje/${jParams.idViaje}`, 'PUT', editJson);
}

async function agregarPasajeroACola(jParams){
    let viaje = await REQUEST(`${routeApi}Viaje/${jParams.idViaje}`);
    let pasajeroEnColaNuevo = viaje.pasajeroEnCola;
    pasajeroEnColaNuevo.push(jParams.pasajeroEnCola);

    let editJson = {
        idUsuario : viaje.idUsuario,
        origen : viaje.origen,
        destino : viaje.destino,
        pasajerosEnCola : pasajeroEnColaNuevo, //atributo que se edita
        pasajerosEnRuta : viaje.pasajerosEnRuta,
        status : viaje.status, 
        t_Salida : viaje.t_Salida,
        t_Llegada : viaje.t_Llegada,
        t_Alta : viaje.t_Alta,
        tarifa : viaje.tarifa
    };
    return REQUEST(`${routeApi}Viaje/${jParams.idViaje}`,'PUT',editJson);
}

async function aceptarPasajeroARuta(jParams){
    let viaje = await REQUEST(`${routeApi}Viaje/${jParams.idViaje}`);
    let pasajeroEnRutaNuevo = viaje.pasajerosEnRuta;
    pasajeroEnRutaNuevo.push(jParams.pasajeroEnRuta);

    let editJson = {
        idUsuario : viaje.idUsuario,
        origen : viaje.origen,
        destino : viaje.destino,
        pasajerosEnCola : viaje.pasajeroEnCola, 
        pasajerosEnRuta : pasajeroEnRutaNuevo,//atributo que se edita
        status : viaje.status, 
        t_Salida : viaje.t_Salida,
        t_Llegada : viaje.t_Llegada,
        t_Alta : viaje.t_Alta,
        tarifa : viaje.tarifa
    };
    return REQUEST(`${routeApi}Viaje/${jParams.idViaje}`,'PUT',editJson);
}

function saveAgendaViaje(jParams){
    return REQUEST(`${routeApi}AgendaViaje`,'POST',jParams);
}

async function getViajeCoordinates(jParams){
    let viajes = await REQUEST(`${routeApi}Viaje`);
    
}
