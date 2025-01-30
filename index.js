import express from "express"
const app = express()
import mongoose from 'mongoose'
import userRouter from "./routes/user.route.js"
import tempRouter from "./routes/temp.route.js"
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
app.use(cors())

const allowedOrigins = [
  'https://temp-count-app.vercel.app',
  'http://localhost:5173/',
  ];
app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
      credentials: true, // Allow cookies and credentials
    })
  );

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',  'https://temp-count-app.vercel.app/'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
//     console.log("DB connected");
// }).catch((err)=>{
//     console.log(err);
// }
// )


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


app.use('/api/user', userRouter)
app.use('/api/temp', tempRouter)




app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on port 3000");
    
})