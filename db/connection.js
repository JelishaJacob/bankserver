const mongoose=require('mongoose')


mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("_____________Mongodb Atlas Connected_____________");
}).catch(()=>{
    console.log("_____________Mongodb Atlas Not Connected____________");
})