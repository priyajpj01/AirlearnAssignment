const assert=require('assert')
const express=require('express')
const app=express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const keys = require('../config/keys.js');
const User=require('../models/user')
const mongoose = require('mongoose');
const chai=require("chai")
const chaiHttp=require("chai-http")
chai.should()
chai.use(chaiHttp)

const Exam = require('../Routes/examRoute');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true },
    { useUnifiedTopology: true } );
describe('Creating records',()=>
{
    console.log('inside escribe block')

it('saves a user',(done)=>
{
    chai.request('http://localhost:3000').post('/user/signin')
    .send({username:"priya",email:"p@gmail.com",password:"123"})
    .end((err,response)=>
    {
        response.should.have.status(200)
        response.body.length.should.not.be.eq(0)
    })
    done()
})


})


describe('/GET exams', () => {

    it('it should GET all the questions', (done) => {
        chai.request(Exam)
        .get("/api/questions")
        .end((err,response)=>
        {
            console.log(response.body)
            should.exist(response.body);
            response.should.have.status(200)
            response.body.should.be.a('array')
            response.body.length.should.not.be.eq(0)
        })
        done();
       
    });
});

    describe('/POST exams', () => {
        it('it should crate question paper', (done) => {
            chai.request('http://localhost:3000').post('/api/createExam')
                .send([{
                    "question":"what is color of leaves",
                    "options":[
                        {
                            "option":"red"
                        },
                        {
                            "option":"green",
                            "isCorrect":"true"
                        }
                    ]
                },
                {
                    "question":"what is color of wood",
                    "options":[
                        {
                            "option":"red"
                        },
                        {
                            "option":"brown",
                            "isCorrect":"true"
                        }
                    ]
                }])
                .end(function(err, response) {
                    console.log(response.body)

                    response.should.have.status(200)
                    response.body.length.should.not.be.eq(0)
                    response.body.should.be.a('array')
                });
                done()

        });
    })
