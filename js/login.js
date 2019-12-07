
$(function () {



});

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

$(document).ready(function () {
    var form = $("#login");
    form.validate();
    $("#btn-submitLogin").click(function () {
        if (form.valid()) {
            //submit
            Toast.fire({
                icon: 'success',
                title: 'Correct Login'
            })
        }
        else {
            Toast.fire({
                icon: 'error',
                title: 'Incorrect Login'
            })
        }
    });
})
