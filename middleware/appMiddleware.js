const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const applicationMiddleware = [
    morgan('dev'),
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
]


module.exports = {
    applicationMiddleware
}