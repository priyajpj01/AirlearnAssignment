
const mongoose=require('mongoose')

// Creating examSchema using mongoose schema
const examSchema = new mongoose.Schema([{
    
    question:
    {
  type:String
    },
    options: [{
        option: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true,
            default: false
        }

    }]
  }]);

  //Set the schema in mongoose model
  const exam=mongoose.model('Exam',examSchema)

  //Export model for  further use
  module.exports=exam