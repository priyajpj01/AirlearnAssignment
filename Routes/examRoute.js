
const mongoose = require('mongoose');
const express=require('express')
const app=express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const router=express.Router()
const Exam = require('../models/exam');
const user = require('../models/user');

// API to get specific question for a user

  router.get('/api/question/:id', async (req, res) => {
    const question = await Exam.findOne({
      _id: req.params.id
    });

    res.send(question);
  });

  // API to get all questions
  router.get('/api/questions', async (req, res) => {
      try{
        const questions = await Exam.find({})
        res.status(200).send(questions)
      }catch(error)
      {
        return res.status(500).send(error)
      }

  });

  // API to create question paper by a user
  //first create then evaluate exam

  // Request JSON for below API
//   [{
//     "question":"what is our national flower",
//     "options":[
//         {
//             "option":"rose"
//         },
//         {
//             "option":"lotus",
//             "isCorrect":"true"
//         },
// {
//             "option":"sunflower"
//         },

//     ]
// },
// {
//     "question":"what is our national sport",
//     "options":[
//         {
//             "option":"badminton"
//         },
//         {
//             "option":"hockey",
//             "isCorrect":"true"
//         }
//     ]
// }]
  
router.post('/api/createExam', async (req, res) => {
      let exam
req.body.map(async(value)=>
{
const question=value.question
const options = value.options;
         exam = await new Exam({
          question,
          options
        });
        
          await exam.save()
        
      })
      res.send("done")
   
  });

// API to check for the given question the right answer and display total marks
// Request JSON : [{
//     "question":"what is our national flower",
//     "answer":"lotus"
// },
// {
//     "question":"what is our national sport",
//     "answer":"hockey"
// }
// ]
  router.post('/api/attemptExam', async (req, res) => {
let ans = req.body.map(async(value)=>
{
    const response=await Exam.findOne({question:value.question})
    response.options.map(async(key)=>
    {
console.log(key)
if(key.option==value.answer)
         {
             if(key.isCorrect==true)
                 result=await user.findOneAndUpdate({username:"priya"},{$inc:{"marks":4}})
              else
              {
                result=await user.findOneAndUpdate({username:"priya"},{$inc:{"marks":-1}})

              }
         }
    })

});
  try {
    const User=await user.findOne({username:"priya"})
    res.status(200).send(User)
  } catch (err) {
    res.send(400, err);
  }
});
module.exports = router