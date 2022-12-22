import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import UserDetailsSchema from './accountDetails.js';

const app = express();

//general set up 
app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors());
app.use(express.json())

// tells the server to listen on port 3001
const PORT = 3001;
app.listen(PORT, () => { });

// DATABASE
// establishing a connection between database and backend
const CONNECTION_URL = 'mongodb+srv://aaryachitnis:phoenix14@cluster0.yphr5ln.mongodb.net/?retryWrites=true&w=majority'; 
// removes the deprecation warning
mongoose.set('strictQuery', true);
// useNewUrlParser and useUnifiedTopology makes sure there's no warnings when you run the program
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
// creates a new document and stores the data in UserInfo
const User = mongoose.model('UserInfo');

// adds email and password to the database in UserInfo
app.post("/register", async(req, res) => {
    const {email, password } = req.body;
    try{
        await User.create({
            email,
            password,
        }); 
        res.send({status:"ok"})
    }catch(error) {
        res.send({status:"error"})
    }
});





