const ORDER_ASC_BY_NAME = "AZ";
const ORDER_ASC_BY_COST = "$UP";
const ORDER_DESC_BY_COST = "$DW";
const ORDER_BY_PROD_COUNT = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var texto = undefined; 

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function showProductsList(){
    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        let prodName = product.name.toLowerCase();        
        let prodDesc = product.description.toLowerCase();   

        if (
            ((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
            ((prodDesc.indexOf(texto)) !== -1 || (prodName.indexOf(texto)) !== -1) 
            ){

            htmlContentToAppend += `
            <div class="col-sm-6 col-lg-3">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card withzoom" style="padding: 0.5rem;">
                        <img class="bd-placeholder-img card-img-top rounded-bottom" src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                            <h4 class="mb-1 pl-2" style="margin-top: 0.5rem">`+ product.name +`</h4>
                            <small class="text-muted p1-2" style="margin-left: 1.3rem;">` + product.currency + ": " + product.cost + ` </small>
                            <small class="text-muted" style="margin-left: 1.3rem;">` + product.soldCount + ` artículos vendidos</small>
                            <div class="card-body">
                                <p class="mb-1" style="font-size: 0.85rem;">` + product.description + `</p>
                            </div>
                </a>
            </div>
            `
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
        document.getElementById("searchBar").value = "";
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        texto = undefined;
        minCount = undefined;
        maxCount = undefined;

        filtrar();
        showProductsList();
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
        showProductsList();
    });
});

const filtrar= ()=>{
    texto = searchBar.value.toLowerCase();
    showProductsList();
}
searchBar.addEventListener('keyup', filtrar)
filtrar();