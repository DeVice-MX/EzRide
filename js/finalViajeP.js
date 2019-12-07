var calificacion = 0;
var puntaje = 0;
$(function(){

    $(document).on('click','.input-star',fnShowMessage);
    $(document).on('click','#btnCalifica',fnCalificaViaje);

});

var fnCalificaViaje = function(){
    const params = new URLSearchParams(document.location.search);
    const idViaje = params.get("idViaje");

    editPuntajeUsuario({idViaje : idViaje,puntaje : puntaje}).then(data=>{
        window.location.href = "/html/menu.html";
    });
}

var fnShowMessage = function(e){
    let value = $(this).val();
    calificacion = parseInt(value);
    puntaje = calificacion*20;
    if(value == "1"){
        $('#message').html('<i class="far fa-sad-cry text-center"></i>');
    }
    else if(value == "2"){
        $('#message').html('<i class="far fa-surprise"></i>');
    }
    else if(value == "3"){
        $('#message').html('<i class="far fa-smile-beam"></i>');
    }
    else if(value == "4"){
        $('#message').html('<i class="far fa-laugh-wink"></i>');
    }
    else if(value == "5"){
        $('#message').html('<i class="far fa-kiss-wink-heart"></i>');
    }
}



