const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const errorHandler=require('./middleware/error');
const mongoose=require("mongoose");


 //
require('dotenv').config();

// const jwtSecret = process.env.JWT_SECRET;
// console.log(jwtSecret);

//passport


//import Routes
const authRoutes=require("./routes/authRoutes");

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

//database
mongoose.connect('mongodb://127.0.0.1:27017/HMP_OJ_DB',{
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
})
.then(()=>console.log("MongoDb connected"))
.catch((err)=> console.log("MongoDb error",err));

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.get


//routes middleware
app.use('/api',authRoutes);

//error middleware
app.use(errorHandler);



//port
//const PORT = process.env.PORT ;
const PORT=5000;


app.listen(PORT, () => console.log(`listening on port ${PORT}`));