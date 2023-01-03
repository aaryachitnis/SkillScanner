import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import UserDetailsSchema from './accountDetails.js';
import bcrypt from 'bcrypt';


const app = express();

//general set up 
app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors());
app.use(express.json())

// tells the server to listen on port 3001
const PORT = 3001;
app.listen(PORT, () => { });

// DATABASE:
// establishing a connection between database and backend
const CONNECTION_URL = 'mongodb+srv://aaryachitnis:phoenix14@cluster0.yphr5ln.mongodb.net/?retryWrites=true&w=majority'; 
// removes the deprecation warning
mongoose.set('strictQuery', true);
// useNewUrlParser and useUnifiedTopology makes sure there's no warnings when you run the program
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const User = mongoose.model('UserInfo');

// VALIDATION FUNCTIONS:

function hasUppercase(password) {
    return /[A-Z]/.test(password);
}

function hasNumber(password) {
    return /\d/.test(password);
}

function hasSpecialChar (password) {
    var specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return (specialChars.test(password) );
}

// password validation
function passwordValidation (password, confirmPassword){
    if ((password.length > 10) 
    && (hasUppercase(password)==true) 
    && (hasNumber(password)==true) 
    && (hasSpecialChar(password)==true)
    && (password == confirmPassword)) {
        return true;
    } else {
        return false;
    }
}

// email validation
function emailValidation (email){
    const gmail = '@gmail.com';
    const yahoo = "@yahoo.com";
    const hotmail = "@hotmail.com"
    if (((email.includes(gmail))== true) || ((email.includes(yahoo))== true) || ((email.includes(hotmail))== true) ) {
        return true;
    } else {
        return false;
    }
}

// SIGNUP:
app.post("/register", async(req, res) => {
    const {email, password, confirmPassword } = req.body;
    // checking if the user already exists 
    const existingUser = await User.findOne({email});
        if (existingUser){
            return res.send ({error: "User exists"})
        }
    // calling vaidation functions to check if email and password are valid 
    if ((passwordValidation(password, confirmPassword) == true) && (emailValidation (email) ==true )){
        // encrypting the password 
        const encryptedPassword = await bcrypt.hash (password, 8);
        // saving the email and the encrypted password to the database
        try{
            await User.create({
                email, 
                password: encryptedPassword,
            }); 
            res.send({status:"valid"})
        }   catch(error) {
            res.send({status:"error"})
        }
    } else {
        return res.json({error: "invalid"});
    }
});

// Login 
app.post("/login", async(req, res) => {
    console.log ("in login")
    const {email, password,  } = req.body;
    console.log (email, password)
    userExists(email)
}); 


