const express = require('express');
let Route=express.Router();
Route.get('/',(req,res) => {
    res.send('routes working');
});

module.exports = Route;