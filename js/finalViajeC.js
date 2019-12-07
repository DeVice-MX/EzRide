$(function(){
    showPasajeros();
});

function showPasajeros(){
    //const params = new URLSearchParams(document.location.search);
    //const idViaje = params.get("idViaje");
    const idViaje = 1;
    getPasajerosViaje(idViaje).then(data=>{
        let hola = 0;
    });
    
}

