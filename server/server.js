const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const notesRoute = require('./routes/notes');
const auth = require('./routes/auth');

// middle wares
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  }));
app.use(cookieParser()); 
app.use(express.json());

// mongoose connect 
const uri = 'mongodb://127.0.0.1:27017/notekeeper';

mongoose.connect(uri,{useNewUrlParser:true})
.then(()=>{
    console.log("keeper database connected!");
    app.listen(port,()=>{
        console.log("server started at :",port);
    })
})

app.use('/notes',notesRoute);
app.use('/',auth)