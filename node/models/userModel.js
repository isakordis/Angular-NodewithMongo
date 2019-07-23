var mongoose=require('mongoose');
//  var ObjectId=require('mongodb').ObjectID;
var users=mongoose.model('users',{
   
    name:String,
    surname:String,
    age:Number,
    
});
//mymodel benım bu js sınıfında olusturdugum bırsey
//modelım dıyebılırız

module.exports=users;
