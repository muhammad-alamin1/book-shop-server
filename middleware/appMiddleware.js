const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const applicationMiddleware = [
    morgan('dev'),
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    express.static(path.join(__dirname, 'public'))
]


module.exports = {
    applicationMiddleware
}