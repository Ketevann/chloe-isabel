'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path');

 app.use(bodyParser.json())
// app.get('/', (req, res) =>{
//   res.send('hello');
// });

app.listen(process.env.PORT || 8080, () =>{
  console.log('listening on port 8080')
})


app.use('/', express.static(path.join(__dirname, '../public')))
