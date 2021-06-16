const assert=require('assert')
const keys = require('../config/keys.js');
const User=require('../models/user')
const mongoose = require('mongoose');



let Exam = require('../models/exam');

//Require the dev-dependencies
const request = require('request');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true });
describe('Creating records',()=>
{
    console.log('inside escribe block')

it('saves a user',(done)=>
{
const user= new User({username:"Priya",email:"p@gmail.com",password:"123",marks:0})
user.save().then(()=>
{
    assert(!user.isNew)
    done()
})
})


})


describe('/GET exams', () => {
    var url = "http://localhost:3000/api/questions";

    it('it should GET all the questions', (done) => {
        request(url, function(error, response, body) {
            console.log(body)
            assert(response.statusCode==200);
            done()
          });
    });
});

    describe('/POST exams', () => {
        var url = "http://localhost:3000/api/createExam";
    
        it('it should crate question paper', (done) => {
            request(url, function(error, response, body) {
                const exam=Exam.find({_id:body[0]._id})
                assert(exam.length!=0);
                done()
              });
        });
    })
