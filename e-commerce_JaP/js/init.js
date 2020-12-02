const CATEGORIES_URL = "http://localhost:3000/categories";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish_product";
const CATEGORY_INFO_URL = "http://localhost:3000/category_info";
const PRODUCTS_URL = "http://localhost:3000/products";
const PRODUCT_INFO_URL = "http://localhost:3000/product_info";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/product_info_comments";
const CART_INFO_URL = "http://localhost:3000/cart_info";
const CART_BUY_URL = "http://localhost:3000/cart_buy";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function getFileName()
{
  var url = window.location.pathname;
  var lastUri = url.substring(url.lastIndexOf('/')+1);
  if(lastUri.indexOf('?')!= -1)
     return lastUri.substring(0,lastUri.indexOf('?'));
  else
     return lastUri;
}

if (localStorage.getItem('usuario') != null){
  sessionStorage.setItem('usuario', localStorage.getItem('usuario'));
}

if (sessionStorage.getItem('usuario') === null && getFileName() != "login.html") {
  location.replace('login.html');
}
if (sessionStorage.getItem('usuario') != null && getFileName() == "login.html") {
  location.replace('index.html');
}

function cerrar(){
  sessionStorage.removeItem('usuario');
  localStorage.removeItem('usuario');
  location.href="login.html";
}

