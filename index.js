const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const userModel=require('./models/users.js')

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/crud')

//view
app.get('/',(req,res)=>{
    userModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

//add
app.post("/createUser",(req,res)=>{
    userModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

 //update field view
app.get('/getUser:id',(req,res)=>{
    const id=req.params.id;
    userModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

//update
app.put('/update/:id',(req,res)=>{
    const id =req.params.id;
    userModel.findByIdAndUpdate({_id:id},{
        date:req.body.date,
        quoteno:req.body.quoteno,
        property:req.body.property,
        company_details:req.body.company_details,
        cname:req.body.cname,
        caddress:req.body.caddress,
        account_details:req.body.account_details,
        accno:req.body.accno,
        bankname:req.body.bankname,
        branchname:req.body.branchname,
        gtotal:req.body.gtotal,
        advance:req.body.advance,
        due:req.body.due,
        inwords:req.body.inwords,
        started_within:req.body.started_within,
        finished_within:req.body.finished_within,
        testperiod:req.body.testperiod,
        quotvaliduntil:req.body.quotvaliduntil,
        workers:req.body.workers,
        scope:req.body.scope,
        quantity:req.body.quantity,
        description:req.body.description,
        warranty:req.body.warranty,
        rate:req.body.rate,
        total:req.body.total
    
    })
        .then(users=>res.json(users))
        .catch(err=>res.json(err))  
})

app.listen(3001,()=>{
    console.log("server is running");
})
