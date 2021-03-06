const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const Route = require('./Routes/routes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cors	= require('cors');
// definging variables
const port = 6200;

// create app
let app = express();

//defining static sources
app.use(express.static(__dirname + '/public'));
// mongodb conectivity
mongoose.connect('mongodb://localhost/sis');  //for local machine without password
//cors
app.use(cors());
// parsing request body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:'false'}));
//validatin midleware
app.use(expressValidator());
// log requests
app.use(morgan('dev'));

// setting api routes 
app.use('/',Route);

// setting up server
app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server is Bullet at ${port}`);
})
