var map;
var marker;
var once = false;

$(function () {
    initMenu();

    initMap();

    $('#fechaSalida').datepicker().datepicker("setDate", new Date());

    var date = new Date;
    date.setMinutes(date.getMinutes() + 10);
    $('#horaSalida').datetimepicker({
        format: 'LT',
        defaultDate: date,
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            if ($("#txtOrigen").is(":focus")) {
                document.getElementById('txtOrigenTrigger').innerHTML = document.getElementById("txtOrigen").value;
                $('#txtOrigenTrigger').attr('lat', autocomplete.getPlace().geometry.location.lat());
                $('#txtOrigenTrigger').attr('lng', autocomplete.getPlace().geometry.location.lng());
                $('#mdGeneraViaje').modal('show');
            }
            else if ($("#txtDestino").is(":focus")) {
                document.getElementById('btnDestinoTrigger').innerHTML = document.getElementById("txtDestino").value;
                $('#btnDestinoTrigger').attr('lat', autocomplete.getPlace().geometry.location.lat());
                $('#btnDestinoTrigger').attr('lng', autocomplete.getPlace().geometry.location.lng());
                $('#mdGeneraViaje').modal('show');
            }
        }
    });

    $('#txtOrigenTrigger').on('click', fnTriggerTextOrigen);

    $('#btnDestinoTrigger').on('click', fnTriggerTextDestino);

    $('#btnSaveViaje').on('click', fnSaveViaje);

    $('#btnFiltros').on('click', fnGetViajes);

    $(document).on('click', '.seleccionar', fnSeleccionarViaje);

    getCookie('tipoUsuario') == "Pasajero" ? cambiarModal("Buscar") : cambiarModal("Generar");
});

var fnSeleccionarViaje = function () {
    Toast.fire({
        icon: 'success',
        title: 'Se te ha asignado lugar en el viaje'
    });
    $('#mdGeneraViaje').modal('hide');
    aceptarPasajeroARuta(
        {
            "idViaje" : $(this).data('idviaje'),
            "pasajeroEnRuta" : {"idPasajero" : getCookie('idUsuario')},
        }
    );
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 22.144924, lng: -101.016557 },
        zoom: 15,
    });
}

var fnTriggerTextOrigen = function () {
    $('#txtDestino').attr('hidden', true);
    $('#txtOrigen').attr('hidden', false);
    $('#mdGeneraViaje').modal('hide');
    if (map.controls[google.maps.ControlPosition.TOP_LEFT].length > 0)
        map.controls[google.maps.ControlPosition.TOP_LEFT].pop();
    var input = document.getElementById('txtOrigen');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        centerMap(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng(), 'txtOrigen');
    });
}

var fnTriggerTextDestino = function () {
    $('#txtOrigen').attr('hidden', true);
    $('#txtDestino').attr('hidden', false);
    $('#mdGeneraViaje').modal('hide');
    if (map.controls[google.maps.ControlPosition.TOP_LEFT].length > 0)
        map.controls[google.maps.ControlPosition.TOP_LEFT].pop();
    var input = document.getElementById('txtDestino');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        centerMap(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng(), 'txtDestino');
    });
}

function centerMap(lat, long, idBtn) {
    locationRio = { lat: lat, lng: long };
    map.setCenter(new google.maps.LatLng(lat, long));
    marker = new google.maps.Marker({
        position: locationRio,
        map: map,
        title: "Isaac",
    });
}

function cambiarModal(Tipo) {
    if (Tipo == "Buscar") {
        $('#mdTitle').html('Buscar Viaje');
        $('#spanTarifa').attr('hidden', true);
        $('#spanPasajeros').attr('hidden', true);
        $('#btnSaveViaje').attr('hidden', true);
        $('#btnFiltros').attr('hidden', false);
    }
    else if (Tipo == "Generar") {
        $('#mdTitle').html('Generar Viaje');
        $('#spanAgendar').attr('hidden', true);
        $('#sugerenciasViaje').attr('hidden', true);
        $('#btnSaveViaje').attr('hidden', false);
        $('#btnFiltros').attr('hidden', true);
    }
    $('#mdGeneraViaje').modal('show');
}

var fnSaveViaje = async function () {
    var date = new Date;
    date.setMinutes(date.getMinutes() + 18);
    jParams = {
        //"id": 1,
        "idUsuario": getCookie('idUsuario'),
        "origen": {
            "latitud": $('#txtOrigenTrigger').attr('lat'),
            "longitud": $('#txtOrigenTrigger').attr('lng'),
        },
        "destino": {
            "latitud": $('#btnDestinoTrigger').attr('lat'),
            "longitud": $('#btnDestinoTrigger').attr('lng'),
        },
        "pasajerosEnCola": [
        ],
        "pasajerosEnRuta": [
        ],
        "status": "PENDIENTE",
        "t_Salida": $('#fechaSalida').val(),
        "h_Salida": $('#horaSalida').val(),
        "t_Llegada": "",
        "t_LlegadaEstimada": date,
        "t_Alta": new Date(),
        "tarifa": $('#tarifaPersona').val()
    };

    saveViaje(jParams).then(function () {
        Toast.fire({
            icon: 'success',
            title: 'Viaje creado exitosamente'
        });
        $('#mdGeneraViaje').modal('hide');
    });
}

var fnGetViajes = function () {
    params = `Viaje?status=PENDIENTE`;

    $('#sugerenciasViaje').html(`<h5 class="modal-title">Viajes disponibles</h5>`);

    getHistorial(params).then(function (resp) {
        resp = resp.filter(x => x.t_Salida == $('#fechaSalida').val() && x.origen.latitud == $('#txtOrigenTrigger').attr('lat') && x.origen.longitud == $('#txtOrigenTrigger').attr('lng')
            && x.destino.latitud == $('#btnDestinoTrigger').attr('lat') && x.destino.longitud == $('#btnDestinoTrigger').attr('lng'));

        resp.forEach((viaje, index, array) => {
            $('#sugerenciasViaje').append(`
            <div class="card">
                                <div class="card-header">
                                    <span class="mb-0">
                                            Viaje #${index + 1}
                                            Tarifa $${viaje.tarifa}
                                            <span>Fecha: ${moment(viaje.t_Salida).format("dddd, MMMM Do YYYY")}</span>
                                            <span>Hora: ${viaje.h_Salida}</span>
                                            <button class="btn btn-primary seleccionar" data-idviaje = "${viaje.id}">Seleccionar
                                            </button>
                                    </span>
                                </div>
                            </div>`);
        });
    });
}