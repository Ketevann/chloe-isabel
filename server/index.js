'use strict'

const express = require('express')
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
  console.log(`listening on port ${PORT}` )
})

app.use('/', express.static(path.join(__dirname, '../public')))
