const express=require('express')
const User=require('../models/user')

const router= new express.Router();

// API for signup 
//can be tested using postman
//{"username":"xyz","email":"x@gmail.com","password":"123"}
router.post('/user/signin',async (req,res)=>
{ 

    console.log(req.body)
    try
        {
            // Creating new user

             const user= await new User(req.body)
             await user.save()
             console.log("user saved")
                if (!user) {
                  res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
                }else {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.json({success: true, status: 'Registration Successful!'});
                }
            
        }
        catch(e)
        {
            //check If user is already registered
            const user=User.findOne({email:req.body.email})
            console.log("user found"+req.body.email)
            if(user)
            {
                res.status(404).send("Already existing account,Please login")
            }
        }  
})

//Exporting user for the use in other files
module.exports = router