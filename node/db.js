var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/NodeProje',(err)=>{
    if(!err)
    console.log('MongoDB Success');
    else
    console.log('Not Success')+JSON.stringify(err,undefined(),2);
});

module.exports=mongoose;