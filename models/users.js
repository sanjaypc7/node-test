const mongoose=require('mongoose')

const billTableSchema=new mongoose.Schema({
    scope: String,
  quantity: Number,
  description: String,
  warranty: String,
  rate: Number,
  total: Number
})
const userSchema=new mongoose.Schema({
    top_section: {

        date: String,
           // default: Date.now  // Set a default value to the current date and time
        
           quoteno: {
             type: String,
             unique: true // Ensure unique values for quoteno
           },
           property: String,
         company_details: {
           cname: String,
           caddress: String,
           account_details: {
             accno: String,
             bankname: String,
             branchname: String,
           },
         },
          },
          middle_section: {
            bill_table: [billTableSchema], // Array of bill_table subdocuments
            gtotal: Number,
            advance: Number,
            due: Number,
          },
          bottom_section: {
            inwords: String,
            started_within: String,
            finished_within: String,
            testperiod: String,
            quotvaliduntil: String,
            workers: Number,
          }
});



const userModel=mongoose.model("users",userSchema)
module.exports=userModel
