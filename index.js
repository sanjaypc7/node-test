const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const userModel=require('./models/users.js')
const adminLogin=require('./models/users.js')

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://seethalsadan:cPHVxeManevoRzZY@cluster0.5t8cop2.mongodb.net/ProtectorDb?retryWrites=true&w=majority')


//login 

const login = async (uname, password) => {
  console.log('Inside login function');
  try {
      const user = await adminLogin.find({ uname, password });
      if (user) {
          return {
              statusCode: 200,
              message: 'Login Successfully',
          };
      } else {
          return {
              statusCode: 404,
              message: 'Invalid Username or Password',
          };
      }
  } catch (error) {
      console.error(error);
      return {
          statusCode: 500,
          message: 'Internal server error',
      };
  }
};

//view
app.get('/',(req,res)=>{
    userModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

//add
app.post("/createUser", (req, res) => {
  userModel.create(req.body)
    .then(users => {
      // Successfully created user
      res.status(201).json(users);
    })
    .catch(err => {
      // Handle errors, e.g., duplicate key error (E11000)
      if (err.code === 11000) {
        res.status(400).json({ message: "Duplicate key error. User with the same quoteno already exists." });
      } else {
        res.status(500).json({ message: "Internal server error", error: err });
      }
    });
});
 //update field view
app.get('/getUser:id',(req,res)=>{
    const id=req.params.id;
    userModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
});

app.put('/update/:quoteno',(req,res)=>{
  const quoteno =req.params.quoteno;
  userModel.findOneAndUpdate({quoteno:quoteno},{
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
});
app.listen(3001,()=>{
    console.log("server is running");
})

module.exports={login};
