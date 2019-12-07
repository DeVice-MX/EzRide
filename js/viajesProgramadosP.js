$(function () {
    initMenu();
    loadViajesProgramados();
});

function loadViajesProgramados() {
    let params = {
        idUsuario: getCookie('idUsuario')
    }

    getViajesProgramadosP(params)
        .then((data) => {
            let i = 0;
            for (let viaje of data) {
                if (true) {
                    i++;

                    let html = `<div class="card">
                            <div class="card-header" id="viaje${i}">
                                <span class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true"
                                        aria-controls="collapse${i}">
                                        Viaje #${i}
                                    </button>
                                    <span>Fecha: ${moment(viaje.t_Alta).format('L')}</span>
                                    <a class="btn btn-danger" href="/html/finalViajeP.html?idViaje=${viaje.id}">
                                        Finalizar
                                    </a>
                                </span>
                            </div>
                
                            <div id="collapse${i}" class="collapse" aria-labelledby="viaje${i}" data-parent="#accordionViajes">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <i class="far fa-money-bill-alt"></i>
                                            <span class="font-weight-bold">Tarifa:</span> $${viaje.tarifa}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                        <i class="far fa-clock"></i>
                                            <span class="font-weight-bold">Duracion:</span> ${moment(viaje.t_Salida).diff(viaje.t_Llegada, 'minutes')} minutos
                                        </div>
                                    </div>  
                                    <div class="row">
                                        <div class="col">
                                            <i class="fas fa-users"></i>
                                            <span class="font-weight-bold">Pasajeros:</span> ${viaje.pasajerosEnRuta.length}
                                        </div>
                                    </div>                                      
                                    <div class="row">
                                        <div class="col">
                                            <i class="fas fa-map-marked-alt"></i>
                                            <span class="font-weight-bold">Origen:</span>
                                        </div>
                                        <iframe class="iframe" src="https://maps.google.com/?ll=${viaje.origen.longitud},${viaje.origen.latitud}&z=10&t=m&output=embed" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <i class="fas fa-map-marked-alt"></i>
                                            <span class="font-weight-bold">Destino:</span>
                                        </div>
                                        <iframe class="iframe" src="https://maps.google.com/?ll=${viaje.destino.longitud},${viaje.destino.latitud}&z=10&t=m&output=embed" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    $("#divViajesProgramados").append(html);
                }
            }
        });
}