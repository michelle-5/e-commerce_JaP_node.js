var articlesArray = [ ];

function showArticles(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.articles.length; i++){
        let article = array.articles[i];

        htmlContentToAppend += `
        <tr>
            <td style="width: 10%"><img width="80%" src="` + article.src + `"></td>
            <td style="width: 22%;">`+ article.name +`</td>
            <td style="width: 15%;">`+ article.currency +`</td>
            <td style="width: 15%;">`+ article.unitCost + `</td>
            <td style="width: 15%"><input min="0" style="width: 43%; border: 1px solid lightgray; border-radius:0.2rem;" type="number" value="` + article.count + `"></td>
            <td style="width: 1%">`+ article.count*article.unitCost + `</td>
        </tr>
        <button name="delete" class="btn" style="color: red"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg></button>`

        document.getElementById("articles-container").innerHTML = htmlContentToAppend;

        document.getElementsByName("delete")[i].addEventListener("click", function(){
            document.getElementsByTagName("td")[6].style.display = "none";
            document.getElementsByTagName("td")[7].style.display = "none";
            document.getElementsByTagName("td")[8].style.display = "none";
            document.getElementsByTagName("td")[9].style.display = "none";
            document.getElementsByTagName("td")[10].style.display = "none";
            document.getElementsByTagName("td")[11].style.display = "none";
            document.getElementsByName("delete")[1].style.display = "none";
        });
        
        document.getElementsByName("delete")[0].addEventListener("click", function(){
            document.getElementsByTagName("td")[0].style.display = "none";
            document.getElementsByTagName("td")[1].style.display = "none";
            document.getElementsByTagName("td")[2].style.display = "none";
            document.getElementsByTagName("td")[3].style.display = "none";
            document.getElementsByTagName("td")[4].style.display = "none";
            document.getElementsByTagName("td")[5].style.display = "none";
            document.getElementsByName("delete")[0].style.display = "none";
        });

        document.getElementsByTagName("input")[11].addEventListener("change", function(){
            document.getElementsByTagName("td")[11].textContent = ($(this).val()*article.unitCost);
            document.getElementById("productCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40));

            if (document.getElementById("goldradio").checked === true){
                document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.15);
                document.getElementById("totalCostText").innerHTML = parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40) + parseInt(document.getElementById("comissionText").textContent);
            }
            if (document.getElementById("premiumradio").checked === true){
                document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.07);
                document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
            }
            if (document.getElementById("standardradio").checked === true){
                document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.05);
                document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
            }
            if(document.getElementsByTagName("input")[11].value < 1){
                document.getElementsByTagName("td")[6].style.display = "none";
                document.getElementsByTagName("td")[7].style.display = "none";
                document.getElementsByTagName("td")[8].style.display = "none";
                document.getElementsByTagName("td")[9].style.display = "none";
                document.getElementsByTagName("td")[10].style.display = "none";
                document.getElementsByTagName("td")[11].style.display = "none";
                document.getElementsByName("delete")[1].style.display = "none";
            }
        });
            
        document.getElementsByTagName("input")[10].addEventListener("change", function(){
            document.getElementsByTagName("td")[5].textContent = $(this).val()*array.articles[0].unitCost;
            document.getElementById("productCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40));

            if (document.getElementById("goldradio").checked === true){
                document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.15);
                document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
            }
            if (document.getElementById("premiumradio").checked === true){
                document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.07);
                document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
            }
            if (document.getElementById("standardradio").checked === true){
                document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.05);
                document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
            }
            if(document.getElementsByTagName("input")[10].value < 1){
                document.getElementsByTagName("td")[0].style.display = "none";
                document.getElementsByTagName("td")[1].style.display = "none";
                document.getElementsByTagName("td")[2].style.display = "none";
                document.getElementsByTagName("td")[3].style.display = "none";
                document.getElementsByTagName("td")[4].style.display = "none";
                document.getElementsByTagName("td")[5].style.display = "none";
                document.getElementsByName("delete")[0].style.display = "none";
            }
        });     
    }
    document.getElementById("productCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40));
    
    let envío = `<div class="d-block my-3">
    <div class="custom-control custom-radio">
    <input id="goldradio" name="publicationType" type="radio" class="custom-control-input" checked="" required="">
    <label class="custom-control-label" for="goldradio">Premium: 2 a 5 días (15%)</label>
    </div>
    <div class="custom-control custom-radio">
    <input id="premiumradio" name="publicationType" type="radio" class="custom-control-input" required="">
    <label class="custom-control-label" for="premiumradio">Express: 5 a 8 días (7%)</label>
    </div>
    <div class="custom-control custom-radio">
    <input id="standardradio" name="publicationType" type="radio" class="custom-control-input" required="">
    <label class="custom-control-label" for="standardradio">Estándar: 12 a 15 días (5%)</label>
    </div>
    </div>`
    document.getElementById("envío").innerHTML = envío;

    document.getElementById("goldradio").addEventListener("change", function(){
        document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.15);
        document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
    });
    document.getElementById("premiumradio").addEventListener("change", function(){
        document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.07);
        document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
    });
    document.getElementById("standardradio").addEventListener("change", function(){
        document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.05);
        document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
    });
    if (document.getElementById("goldradio").checked === true){
        document.getElementById("comissionText").innerHTML = Math.round((parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) * 0.15);
        document.getElementById("totalCostText").innerHTML = (parseInt(document.getElementsByTagName("td")[5].textContent) + parseInt(document.getElementsByTagName("td")[11].textContent*40)) + parseInt(document.getElementById("comissionText").textContent);
    }
}

    document.getElementsByName("method")[0].addEventListener("change", function(){
        if (document.getElementById("tarjeta").checked){
            document.getElementsByClassName("number")[2].disabled = true;
            document.getElementsByClassName("number")[3].disabled = true;
        }else{
            document.getElementsByClassName("number")[2].disabled = false;
            document.getElementsByClassName("number")[3].disabled = false;   
        }
        if (document.getElementById("banco").checked){
            document.getElementsByClassName("number")[0].disabled = true;
            document.getElementsByClassName("number")[1].disabled = true;
            document.getElementsByName("date")[0].disabled = true;
            document.getElementsByName("card")[0].disabled = true;
            document.getElementsByName("card")[1].disabled = true;
            document.getElementsByName("card")[2].disabled = true;
        }else{
            document.getElementsByClassName("number")[0].disabled = false;
            document.getElementsByClassName("number")[1].disabled = false;
            document.getElementsByName("date")[0].disabled = false;
            document.getElementsByName("card")[0].disabled = false;
            document.getElementsByName("card")[1].disabled = false;
            document.getElementsByName("card")[2].disabled = false;
        }
    });
   
    document.getElementsByName("method")[1].addEventListener("change", function(){
        if (document.getElementById("tarjeta").checked){
            document.getElementsByClassName("number")[2].disabled = true;
            document.getElementsByClassName("number")[3].disabled = true;
        }else{
            document.getElementsByClassName("number")[2].disabled = false;
            document.getElementsByClassName("number")[3].disabled = false;
        }
        if (document.getElementById("banco").checked){
            document.getElementsByClassName("number")[0].disabled = true;
            document.getElementsByClassName("number")[1].disabled = true;
            document.getElementsByName("date")[0].disabled = true;
            document.getElementsByName("card")[0].disabled = true;
            document.getElementsByName("card")[1].disabled = true;
            document.getElementsByName("card")[2].disabled = true;
        }else{
            document.getElementsByClassName("number")[0].disabled = false;
            document.getElementsByClassName("number")[1].disabled = false;
            document.getElementsByName("date")[0].disabled = false;
            document.getElementsByName("card")[0].disabled = false;
            document.getElementsByName("card")[1].disabled = false;
            document.getElementsByName("card")[2].disabled = false;
        }
    });
        if (document.getElementById("tarjeta").checked){
            document.getElementsByClassName("number")[2].disabled = true;
            document.getElementsByClassName("number")[3].disabled = true;
        }

$('#finalizar').click(function(event) {
    if((document.getElementsByName("calle")[0].value.length == 0) || (document.getElementsByName("num")[0].value.length == 0) || (document.getElementsByName("esq")[0].value.length == 0)){
        event.stopPropagation();
    }   
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            articlesArray = resultObj.data;
            //Muestro los artículos ordenados
            showArticles(articlesArray);
        }
    });
});