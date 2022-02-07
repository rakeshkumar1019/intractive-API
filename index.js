let express=require('express')
var cors = require('cors')
const request = require('request');
let fs =require('fs')
let bodyParser=require('body-parser')
let db=require('./db.json')
let app=express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.set('view engine','ejs')
let PORT=process.env.PORT || 8081

app.get("/",(req,res)=>{
     res.render('admin',{data:db})
})
app.get("/channels",(req,res)=>{
    res.json({data1:db})
})

app.post("/channels/save",(req,res)=>{
    let objs=req.body
    const options = {
        url: `http://127.0.0.1:3005/store/${req.body.id}`,
        json: true,
        body: objs
    };    
    request.put(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    });
    res.json({data:"updated"})
})

app.post("/newchannel",(req,res)=>{
    let objs=req.body
    const options = {
        url: `http://127.0.0.1:3005/store/`,
        json: true,
        body: objs
    };    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    });
    res.json({data:"add new channel"})
})

app.listen(PORT,(err)=>{
   if(err) throw err
   console.log(`server is running at port:${PORT}`)
})