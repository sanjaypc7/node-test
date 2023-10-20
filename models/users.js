const mongoose=require('mongoose')

// Define the schema for the bill_table subdocument
const billTableSchema = new mongoose.Schema({
    scope: String,
    quantity: Number,
    description: String,
    warranty: String,
    rate: Number,
    total: Number,
  });

// Define the main schema for the Quote
const userSchema = new mongoose.Schema({
    top_section: {
  
     date: String,
        // default: Date.now  // Set a default value to the current date and time
        property: String,
        quoteno: {
          type: String,
          unique: true // Ensure unique values for quoteno
        },
        to:String,
       },
    middle_section: {
      bill_table: [billTableSchema], // Array of bill_table subdocuments
      gtotal: Number,
      advance_with_vat: Number,
      due: Number,
    },
    bottom_section: {
      inwords: String,
      started_within: String,
      finished_within: String,
      testperiod: String,
      quot_valid_until: String,
      no_of_workers: Number,
    },
  });


const userModel=mongoose.model("Quote",userSchema)
const adminLogin=mongoose.model("user",{
  uname:String,
  password:String
})
module.exports={
  userModel,
  adminLogin
}
