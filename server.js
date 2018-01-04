const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const Route = require('./Routes/routes');
const morgan = require('morgan');
// definging variables
const port = 6200;

// create app
let app = express();
//defining static sources
app.use(express.static('./public'));

// parsing request body
app.use(bodyparser());
// log requests
app.use(morgan());

// setting api routes 
app.use('/',Route);

// setting up server
app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server is Bullet at ${port}`);
})
