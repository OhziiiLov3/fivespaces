require('dotenv').config()
const experss = require("express");
const morgan = require("morgan");
const app = experss()
const authRouter = require("./routes/authRouter");
const boardRouter = require("./routes/boardRouter");

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));

//middleware
app.use(experss.json());




app.get('/', (req, res)=>{
 res.send("<h1>Api is running...</h1>");
});


app.use('/api/auth', authRouter);
app.use('/api/boards', boardRouter);





app.listen(PORT, ()=> {
    console.log(`Server is runnning on port: ${PORT}`);
});






