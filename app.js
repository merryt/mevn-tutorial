const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const messages = require('./db/messages');

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        "data": "api home"
    });
});

app.get('/messages', (req, res) => {
    console.log("here")
    messages.getAll().then((messageList) => {
        if(messageList) {
            res.json(messageList);
        }else{
            res.json({"data": "no messages"})
        }

    })
});

app.post('/messages', (req, res) => {
    console.log(req.body)
    messages.create(req.body).then((message) =>{
        res.json(message);
    }).catch((error)=>{
        res.status(500)
        res.json(error);
    });
});


const port = process.env.PORT || 4000;
app.listen(port, () =>{
   console.log(`listening on ${port}`);
});
