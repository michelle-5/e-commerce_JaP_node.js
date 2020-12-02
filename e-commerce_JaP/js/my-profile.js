    if (sessionStorage.getItem('usuario') != null){
         document.getElementById("correo").value = sessionStorage.getItem('usuario');
     }
 
     document.getElementById("guardarCambios").addEventListener("click", function(){
         saveProfileData();
      });

      function getProfileData() {
     var loginObj = JSON.parse(localStorage.getItem("userInfo"));
     if(loginObj != null){
         document.getElementById("profilePic").src = loginObj.image;
         document.getElementById("nombres").value = loginObj.name;
         document.getElementById("apellidos").value = loginObj.lastname;
         document.getElementById("edad").value = loginObj.age;
         document.getElementById("telefono").value = loginObj.phone;
         }
     }
 
     function saveProfileData() {
         var userImg = document.getElementById("profilePic").src;
         var userName = document.getElementById("nombres").value;
         var userLastname = document.getElementById("apellidos").value;
         var userAge = document.getElementById("edad").value;
         var userEmail = sessionStorage.getItem('usuario');
         var userPhone = document.getElementById("telefono").value;
 
         var loginObj = {
             image: userImg,
             name: userName,
             lastname: userLastname,
             age: userAge,
             email: userEmail,
             phone: userPhone
         };
         localStorage.setItem("userInfo", JSON.stringify(loginObj));
     }
 
 function isNumberKey(evt){
     var charCode = (evt.which) ? evt.which : evt.keyCode
     if (charCode > 31 && (charCode < 48 || charCode > 57))
         return false;
     return true;
 }
 
 document.getElementById("upload").addEventListener("change", function(){
     const reader = new FileReader();
 
     reader.addEventListener("load", () => {
         document.getElementById("profilePic").src = reader.result;
     });

     reader.readAsDataURL(this.files[0]);
 });
 
 document.addEventListener("DOMContentLoaded", () => {
    getProfileData();
    if(JSON.parse(localStorage.getItem("userInfo")) == null){
         document.getElementById("profilePic").setAttribute("src", "https://www.lococrossfit.com/wp-content/uploads/2019/02/user-icon.png");
     }
 });
