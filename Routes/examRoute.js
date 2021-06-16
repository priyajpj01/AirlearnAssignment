
const mongoose = require('mongoose');
const express=require('express')
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
        res.status(200).json(questions)
      }catch(error)
      {
        return res.status(500).json({"error":error})
      }

  });

  // API to create question paper by a user

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
      console.log(req)
      for(const[key,value] of Object.entries(req.body))
      {
          console.log(value)
        const question = value.question;
        const options = value.options;
        const exam = new Exam({
          question,
          options
        });
        try {
          await exam.save();
          res.json({ status: 200, result: exam });
        } catch (err) {
            res.json({ status: 500, error: err });
        }
      }
   
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
let result

  for(var[key1,value1] of Object.entries(req.body))
  {
      const response=await Exam.findOne({question:value1.question})
      for(var[key2,value2] of Object.entries(response.options))
      {
         if(value2.option==value1.answer)
         {
             if(value2.isCorrect==true)
                 result=await user.findOneAndUpdate({username:"priya"},{$inc:{"marks":4}})
              else
              {
                result=await user.findOneAndUpdate({username:"priya"},{$inc:{"marks":-1}})

              }
         }
      }
  }
  try {
    const User=await user.findOne({username:"priya"})
    res.status(200).send(User)
  } catch (err) {
    res.send(400, err);
  }
});
module.exports = router