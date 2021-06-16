const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

// Creating user Schema using mongoose Schema
const userSchema = new mongoose.Schema({
  username:
  {
type:String,
required:true
  },
  password: 
  {
      type:String,
      required:true

  },
  email:
  {
      type:String,
      required:true
  },
  marks:
  {
      type:Number
  }
});


// userSchema.pre('save',async function (next)
// {

//     const user=this
//     if(user.isModified('password'))
//     {
//         user.password=await bcrypt.hash(user.password,10)
//     }
// next()
// })

const users=mongoose.model('User', userSchema);
module.exports=users

