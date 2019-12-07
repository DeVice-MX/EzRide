$(function(){

    $(document).on('click','.input-star',fnShowMessage);

});

function calificaViaje(){
    
}

var fnShowMessage = function(e){
    let value = $(this).val();
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



