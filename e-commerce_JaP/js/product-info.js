var currentProductsArray = [];
var currentCommentsArray = [];
var relatedProductsArray = [];
var product = {};
let addComment = "";
var valorStars = "";
var carouselClicked = 0;


$("input[name='rate']" ).on('change', function () {
    valorStars = $(this).val();
});

function showImages(array) {
    let htmlContentToAppend = "";
    let imageHTML = `
    <div class="carousel-item active">
    <img id="active-carousel-img" class="d-block w-100" onclick=zoomIn(\"prod-info-carousel\") src="`+ array[0] +`" alt="Slide `+ 1 +`">
    </div>
    `;
    let indicatorsHTML = `
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    `;
    
    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];

        imageHTML += `
            <div class="carousel-item" onclick=zoomIn(\"prod-info-carousel\")>
            <img class="d-block w-100" src="`+ imageSrc +`" alt="Slide `+ i +`">
            </div>
        `;

        indicatorsHTML += `
            <li data-target="#carouselExampleIndicators" data-slide-to="`+ i +`"></li>
        `;
    }

		htmlContentToAppend +=
			`
        <div id="prod-info-carousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">`
            + indicatorsHTML +
        `</ol>
        <div class="carousel-inner">`
            + imageHTML +
        `</div>
        <a class="carousel-control-prev" href="#prod-info-carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#prod-info-carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
        `;

		document.getElementById("productImages").innerHTML = htmlContentToAppend;
	
}

function zoomIn(elementID){
    let element = document.getElementById(elementID);
    if (carouselClicked === 0){
        element.style += `
            -ms-transform: scale(1.3) translateX(30%);; /* IE 9 */
            -webkit-transform: scale(1.3) translateX(30%);; /* Safari 3-8 */
            transform: scale(1.3) translateX("30%");
            transition: transform 0.5s;
            cursor: -moz-zoom-out; 
            cursor: -webkit-zoom-out; 
            cursor: zoom-out;
        `
        carouselClicked = 1;
    }
    else{
        element.style = `
            transition: transform 0.5s;
            cursor: -moz-zoom-in; 
            cursor: -webkit-zoom-in; 
            cursor: zoom-in;
        `
        carouselClicked = 0;
    }

}

function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comment = array[i];
        let stars = "";

		for (let i=0; i<comment.score; i++){
			stars += `
				<span class="fa fa-star checked"></span>
			`;
		}
		for (let i=comment.score; i<5; i++){
			stars += `
				<span class="fa fa-star"></span>
			`;
		}   

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    <i class="fas fa-user"></i><strong>`+ " " + comment.user +`</strong>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">`+ stars +`</h5>
                            <small class="text-muted">` + comment.dateTime + ` </small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                    </div>
                </div>
            </div>
            `
        document.getElementById("comments-Container").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(array){

    let htmlContentToAppend = "";
        let relatedProduct = array[1];  
        let relatedProduct2 = array[3]; 

            htmlContentToAppend += `
            <div style="display:flex; margin-bottom: 1.3rem; margin-top: 0.5rem;">
            <a style="text-decoration:none; color: black" href="product-info.html"><div class="zoom" style="width: 250px; border-color: lightgray; border-style: solid; border-width: 1px; padding: 1rem; padding-bottom: 1.5rem;">
                <img style="border: 0" class="img-fluid img-thumbnail" width="100%" src="` + relatedProduct.imgSrc + `" alt=""></img> <strong>` + relatedProduct.name + `</strong> <hr> <p> `+ relatedProduct.description +` </p>
            </div></a> 
            <div style="padding:0.5rem"></div>
            <a style="text-decoration:none; color: black" href="product-info.html"><div class="zoom" style="width: 250px; border-style: solid; border-width: 1px; padding: 1rem; padding-bottom:0rem; border-color: lightgray;">
                <img style="border: 0" class="img-fluid img-thumbnail" width="100%" src="` + relatedProduct2.imgSrc + `" alt=""></img> <strong>` + relatedProduct2.name + `</strong> <hr> <p> `+ relatedProduct2.description +` </p>
            </div></a>
            </div>
            `
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {product = resultObj.data;
            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productDesc").innerHTML = product.description;
            document.getElementById("productCost").innerHTML = product.currency + " " + product.cost;
            document.getElementById("productSoldCount").innerHTML = product.soldCount;
            document.getElementById("productCategory").innerHTML = product.category;
            showImages(product.images);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentCommentsArray = resultObj.data;
            showComments(currentCommentsArray);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            relatedProductsArray = resultObj.data;
            showRelatedProducts(relatedProductsArray);
        }
    });
});

var fecha = new Date(),
segundos = fecha.getSeconds(),
horas = fecha.getHours(),
minutos = fecha.getMinutes(),
día = fecha.getDate(),
mes = fecha.getMonth() +1, /*Porque esta función empieza desde 0, y de otra forma devuelve el mes anterior*/
year = fecha.getFullYear().toString();

if (horas < 10){horas = '0' + horas;}
if (mes < 10){mes = '0' + mes;}
if (día < 10){día = '0' + día;}
if (minutos < 10){ minutos = "0" + minutos; }
if (segundos < 10){ segundos = "0" + segundos; }

var userEmail = sessionStorage.getItem("usuario");
var userName = userEmail.split('@')[0];
var newComment = document.getElementById('userComment');

function publicar(){

    let estrellas = "";
for (let i = 0; i < 5; i++) {

    if(i <= valorStars-1){
        estrellas += ` 
        <span class="fa fa-star checked"></span> 
        `;
    }else{
        estrellas += ` 
        <span class="fa fa-star"></span> 
        `;
    }
}
    
        addComment += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <i class="fas fa-user"></i> <strong>${userName}</strong>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${estrellas}</h5>
                        <small class="text-muted">${year+"-"+mes+"-"+día+" "+horas+":"+minutos+":"+segundos}</small>
                    </div>
                    <p class="mb-1">${newComment.value}</p>
                </div>
            </div>
        </div>
        `
            document.getElementById("newComments").innerHTML = addComment;

            
}
