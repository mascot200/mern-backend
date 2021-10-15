import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// bring in postRoute file
import postRoute from './routes/posts.js'
import userRoute from './routes/user.js'


const app = express();
dotenv.config()
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));


app.use(cors())


app.use('/posts', postRoute)
app.use('/user', userRoute)
app.get('/', (req, res) => {
  res.send("Welcome to my api")
});






// DB Config
const dbConfig = {
    MongoURI: process.env.CONNECTION_URL
}

const PORT = process.env.PORT || 5000;
const db = dbConfig.MongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    // { useNewUrlParser: true , useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true}
  )
  .then(() => {
      app.listen(PORT, () => console.log(`Server running in port ${PORT} and mongoDB connected` ));
  })
  .catch(err => console.log(err));




