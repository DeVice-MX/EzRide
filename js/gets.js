'use strict'

function getHistorial(){
    return REQUEST(`${routeApi}viaje?idUsuaurio=1`,"GET");
}