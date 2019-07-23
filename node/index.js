var express=require('express');
var bodyParser=require('body-parser');
//db bağlantı testi
var mongoose=require('./db.js');
var cors=require('cors');
//controller kısmı 
var userController=require('./controller/userController.js');
var app=express();
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));
app.listen(3000,()=>console.log('server started at port:3000'));
app.use('/list',userController);