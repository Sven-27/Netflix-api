const express = require('express');
const app = express();
const port = 3000
const mongoose = require("mongoose")
const {Schema} = mongoose
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jizn1.mongodb.net/netflix-api-db-dev?retryWrites=true&w=majority`, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true});

const User = mongoose.model('Users', new Schema(
    {
        name: String,
        email:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
));

app.use(express.json());

// using the get method
// LOGIC for the Get Request
// I'm trying to get data
app.get('/', (req, res) => {
    res.send("Hellow World")
  })

app.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save((err, user)=> {
        console.log(err)
        if(err){
            console.log(err)
            res.send(400, {
                status: err
            })
        }else{
            console.log("all is good")
            console.log(user);
            res.send('registered');
        }
    })
})

app.post('/login', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    User.findOne({email: email, password: password}, (err, user)=>{
     console.log(user)
    if(user){ 
    res.send({
        status: "valid"
    })
    }else{
        res.send(404, {
            status: "Not Found"
        })
    }
})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})