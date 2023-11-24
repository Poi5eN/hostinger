const express = require('express')
const cookieParser = require('cookie-parser')
const routes = require('./routes/route')
const cors = require("cors");
const app = express()

app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include cookies and authentication headers
  };

app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/api/v1',routes)



module.exports = app