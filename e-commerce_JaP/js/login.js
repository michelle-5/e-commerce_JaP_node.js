const form = document.getElementById('form');
const email = document.getElementById('email');
const checkbox = document.getElementById('check');
const pass = document.getElementById('password');

form.addEventListener('submit',function(event){
    event.preventDefault()

    if (check.checked == true){
        localStorage.setItem('usuario', email.value);
        localStorage.setItem('usuarioPass', pass.value);
        location.href="index.html";
    }else{
        sessionStorage.setItem('usuario', email.value);
        sessionStorage.setItem('usuarioPass', pass.value);
        location.href="index.html";
    }
});

document.addEventListener("DOMContentLoaded", function(e){
});