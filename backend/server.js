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
const  userRoutes=require("./routes/userRoutes");

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



//routes middleware
app.use('/api',authRoutes);
app.use("/api",userRoutes);

// //api for comilation
// const axios = require('axios');

// const cppcode = `#include <iostream>
// using namespace std;

// int main() {
//     int x ;
//     int y ;
//     cin >>x >>y;
//     int sum = x + y;
//     cout << sum;
//     return 0;
// }`;

// const exout='5';

// const options = {
//     method: 'POST',
//     url: 'https://judge0-ce.p.rapidapi.com/submissions',
//     params: {
//         base64_encoded: 'false',
//         wait: 'true',
//         fields: '*'
//     },
//     headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': '18f758967emsh70d88d5f7e10e13p14acffjsne5bf2100c38d',
//         'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
//     },
//     data: {
//         language_id: 52,
//         source_code: cppcode,
//         stdin: '5 2\n',
//         expected_output:exout
//     }
// };

// const sendCodeToCompiler = async () => {
//     try {
//         const response = await axios.request(options);
//         console.log(response.data);
//         //console.log()
//         console.log(response.data.stdout==response.data.expected_output); //prints the output of the program
//     } catch (error) {
//         console.error(error);
//     }
// };

// sendCodeToCompiler();

//error middleware
app.use(errorHandler);
//


//port
//const PORT = process.env.PORT ;
const PORT=5000;


app.listen(PORT, () => console.log(`listening on port ${PORT}`));