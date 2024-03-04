const connectTOMongo = require('./db');
const express = require('express')
const cors = require('cors'); 

connectTOMongo();

const app = express()
app.use(cors());
const port = 5000 

app.use(express.json())

//Routes
app.use('/api/auth',require("./routes/auth")) 
app.use('/api/products',require("./routes/products")) 
app.use('/api/order',require("./routes/order"))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})