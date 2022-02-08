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

let dbserver="https://dbaseserver.herokuapp.com/store"

app.get("/",(req,res)=>{
     res.render('admin',{data:db})
})
app.get("/channels",(requ,response)=>{
    let objs=requ.body
    
    const options = {
        url:dbserver,
        json: true,
        body: objs
    };    
    request.get(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        response.json(body)
 
    });
   
   
})

app.post("/channels",(req,res)=>{
    let objs=req.body
    const options = {
        url: `${dbserver}/${req.body.id}`,
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
        url: `${dbserver}`,
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