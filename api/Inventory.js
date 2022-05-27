require('dotenv').config();
const express = require('express');
import axios from "axios"

const app = express();


app.get('/', async (req,res) => {


  const { data } = await axios.get('https://goweather.herokuapp.com/weather/california');
//   await db.collection('weather').insertOne(data);


  return res.send(data);
});

app.listen(8080);
