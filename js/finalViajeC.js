$(function(){
    showPasajeros();
});

function showPasajeros(){
    //const params = new URLSearchParams(document.location.search);
    //const idViaje = params.get("idViaje");
    const idViaje = 1;
    getPasajerosViaje(idViaje).then(data=>{
        let html = `<ul class="list-group">`;
        data.forEach(function(data){
            let elem = `
        <li class="list-group-item ">
            <div class="card" style="width: 18rem;" >
                <!-- <img class="" src="/images/profile.png" alt="Card image cap" width="10" height="100"> -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <label class="font-weight-bold text-center" style="display: block;">${data.nombreUsuario}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <img class="car-img-top" src="/images/profile.png" alt="Card image cap" width="50" height="50">
                        </div>
                    </div>
                    <div class="row">
                        
                        <div class="col-6">
                            <label class="font-weight-light text-center">Lvl. ${data.reputacion}</label>
                        </div>
                        
                        <div class="col-6">
                            <label class="font-weight-light text-center">${data.puntaje} xp</label>
                        </div>
                    </div>
                    
                    <form class="form-star alig-self-center"> 
                        <p class="clasificacion">
                            <input id="radio1" type="radio" name="estrellas" value="5" class="input-star"><!--
                            --><label for="radio1" class="label-star display-1">
                                <span><i class="fas fa-star display-5"></i></span>
                            </label><!--
                            --><input id="radio2" type="radio" name="estrellas" value="4" class="input-star"><!--
                            --><label for="radio2" class="label-star">
                                <span><i class="fas fa-star display-5"></i></span>
                            </label><!--
                            --><input id="radio3" type="radio" name="estrellas" value="3" class="input-star"><!--
                            --><label for="radio3" class="label-star">
                                <span><i class="fas fa-star display-5"></i></span>
                            </label><!--
                            --><input id="radio4" type="radio" name="estrellas" value="2" class="input-star"><!--
                            --><label for="radio4" class="label-star">
                                <span><i class="fas fa-star display-5"></i></span>
                            </label><!--
                            --><input id="radio5" type="radio" name="estrellas" value="1" class="input-star"><!--
                            --><label for="radio5" class="label-star">
                                <span><i class="fas fa-star display-5"></i></span>
                            </label>
                        </p>
                    </form>
                    <button type="button" class="btn btn-success form-control" data-idusuario="${data.id}">
                        <i class="far fa-thumbs-up"></i>
                    </button>
                </div>
            </div>
        </li>
        `;

            html+=elem;
        });
        html+=`</ul>`;
        $('#pasajeros').html(html);
    });
    
}


