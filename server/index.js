import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { trusted } from 'mongoose';
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

// checks if string contains an upper case letter
function hasUppercase(string) {
    return /[A-Z]/.test(string);
}

// checks if string contains a number
function hasNumber(string) {
    return /\d/.test(string);
}

// checks if string contains special characters
function hasSpecialChar (string) {
    var specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return (specialChars.test(string) );
}

// checks if string contains space
function checksSpace (string) {   
    return ( /\s/g.test(string) );
}

// checks if string contains only numbers 
function hasOnlyNumbers(number){
    return (/^\d+$/.test(number));
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

// full name validation
function fullNameValidation (fullName){
    if ((checksSpace(fullName)==true) 
    && (hasSpecialChar(fullName)==false) 
    && (hasNumber(fullName)==false)) {
        return true
    } else {
        return false
    }
}

// phone number validation
function phoneNumValidation(){
    const number = ''
    if ((hasOnlyNumbers(number)== true) // if the number only contains number
        && (number.charAt(0) == '0') // if the number starts with a 0
        && number.length == 11) { // if number is exactly 11 characters long
        console.log("true")  
    } else {
        console.log ("false")
    }
}

// headlline validation
function headlineValidation(headline){
    if ( (headline.length >= 10) && (headline.length <= 100)){
        return true
    } else {
        return false 
    }
}

// SIGNUP:
app.post("/register", async(req, res) => {
    const {email, password, confirmPassword } = req.body;
    // checking if the user already exists 
    const existingUser = await User.findOne({email});
        if (existingUser){
            return res.json ("User exists")
        }
    // calling vaidation functions to check if email and password are valid 
    if ((passwordValidation(password, confirmPassword) == true) && (emailValidation (email) ==true )){

        const encryptedPassword = await bcrypt.hash (password, 8); // encrypting the password 

        // saving the email and the encrypted password to the database
        try{
            await User.create({
                email, 
                password: encryptedPassword,
            }); 
            return res.json("valid")
        }   catch(error) {
            return res.json("error")
        }
    } else {
        return res.json("invalid");
    }
});


// LOGIN:
app.post("/login", async(req, res) => {
    const {email, password,  } = req.body;

    const user = await User.findOne({email});

    // checking if the user exists
    if (!user){
        return res.json ("User not found")
    }
    
    // checking if password matches with the email 
    const isMatch = await bcrypt.compare(password, user.password) 
    if (!isMatch){
        return res.json ("Wrong password")
    }else {
        return res.json ("Login successful")
    }
}); 

// PROFILE SETUP:




