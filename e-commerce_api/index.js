const cartBuy = require("./json/cart_buy.json");
const cartInfo = require("./json/cart_info.json");
const categories = require("./json/categories.json");
const categoryInfo = require("./json/category_info.json");
const productInfoComments = require("./json/product_info_comments.json");
const productInfo = require("./json/product_info.json");
const products = require("./json/products.json");
const publishProduct = require("./json/publish_product.json");

const express = require('express');
const cors = require('cors'); //Importante para que no haya conflicto por diferentes direcciones al usar el fetch.
const app = express();
const fs = require('fs');

app.use(cors());
app.use( express.json() );
app.use( express.urlencoded({extended: false}) );

app.get('/cart_buy', (req, res) => {
    res.json(cartBuy);
});

app.get('/cart_info', (req, res) => {
  res.json(cartInfo);
});

app.get('/categories', (req, res) => {
  res.json(categories);
});

app.get('/category_info', (req, res) => {
  res.json(categoryInfo);
});

app.get('/product_info_comments', (req, res) => {
  res.json(productInfoComments);
});

app.get('/product_info', (req, res) => {
  res.json(productInfo);
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/publish_product', (req, res) => {
  res.json(publishProduct);
});

app.post('/rutaPOST', (req, res)=>{

  console.log(req.body)
  let calle = req.body.calle;
  let num = req.body.num;
  let esq = req.body.esq;
  let sendData = "Dirección: " +  calle + " " + num + " esq. " + esq;
  console.log(sendData);

  fs.writeFile('shippingInfo.txt', sendData, function(err){
      if(err){
          return console.log(err);
      }
      console.log("¡Archivo creado exitosamente!");
  });
});

app.listen(3000, () =>{ 
    console.log('Serve on port 3000')
});