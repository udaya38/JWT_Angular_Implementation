require('dotenv').config();
const express = require('express');
const cors=require('cors');
const app = express()
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());

function generateAuthToken(username) {
    console.log({
        username
    }, process.env.SECRET_TOKEN)
    return jwt.sign({
        username
    }, process.env.SECRET_TOKEN);
}


app.post('/login', (req, res) => {
    const username = req.body.username;
    const token = generateAuthToken(username);
    return res.json({token})
})

app.get('/verify', (req, res) => {
    const token=req.headers.authorization?.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) 
            return res.sendStatus(401);
        
        res.json({user});
    })
})

app.listen('4000', () => {
    console.log('port started at 4000')
})
