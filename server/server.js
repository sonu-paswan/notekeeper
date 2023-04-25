const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const notes = require('./routes/notes');

// middle wares
app.use(cors());
app.use(express.json());

// mongoose connect 
const uri = 'mongodb://127.0.0.1:27017/keeper';

mongoose.connect(uri,{useNewUrlParser:true})
.then(()=>{
    console.log("keeper database connected!");
})

app.use('/notes',notes);

app.listen(port,()=>{
    console.log("server started at :",port);
})