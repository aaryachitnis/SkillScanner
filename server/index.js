import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { trusted } from 'mongoose';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import databaseSchema from './accountDetails.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
function phoneNumValidation(number){
    if ((hasOnlyNumbers(number)== true) // if the number only contains number
        && (number.charAt(0) == '0') // if the number starts with a 0
        && number.length == 11) { // if number is exactly 11 characters long
            return true  
    } else {
        return false
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
                profile: {
                    fullName: null,
                    profession: null,
                    location: null,
                    expYear: null,
                    email: null,
                    phoneNum: null, 
                    headlines: null,
                    servicesAndProducts: null,
                    experience: null,
                }
            }); 
            const user = await User.findOne({email}); // storing the user in a variable 
            const token = jwt.sign ({ email: user.email }, 'skillscanner123') // signing the email using jwt 
            return res.json({ status: "valid", token: token}) //sending the validation message and token to React 
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
app.post ("/profilesetup", async(req, res) => {
    const {token, fullName, profession, location, expYear, email, phoneNum, headlines, services_products, experience,} = req.body
    const user = jwt.decode(token) // decoding jwt token and storing it to the variable "user"
    var response = "" // initialising response 

    if (fullNameValidation(fullName) == false){ // if name entered isn't valid, update response 
        response = response.concat("Please enter your full name. \n" ) 
        var validName = false
    } 

    if (emailValidation(email) == false){
        response = response.concat("Please enter a valid email \n")
        var validEmail = false
    }

    if (phoneNumValidation(phoneNum) == false){ // if phone number isn't valid, update response 
        response = response.concat("Please enter a valid UK phone number. \n")
        var validPhoneNum = false
    } 

    if (headlineValidation(headlines) == false){ // if headline isn't valid, update response 
        response = response.concat("Headline must be between 30 and 100 characters. Please enter a valid headline.")
        var validHeadline = false
    }   

    // if all validation checks are passed, save the data to the database
    if ((validName != false) && (validPhoneNum != false) && (validEmail != false) && (validHeadline != false)){  
        try {
            await User.updateOne ( // updates document 
                { email: user.email}, // sets condition- where email field equals user.email 
                { $set: { // updates the following fields with the data entered by user
                    "profile.0.fullName" : fullName,
                    "profile.0.profession" : profession,
                    "profile.0.location": location,
                    "profile.0.expYear": expYear,
                    "profile.0.email": email,
                    "profile.0.phoneNum": phoneNum,   
                    "profile.0.headline": headlines,
                    "profile.0.servicesAndProducts": services_products,
                    "profile.0.experience": experience,
                }})
            response = ("valid") // set response to valid if all data entered is valid and is sucessfully saved to the database 
        }catch(error) {
            return res.json(error)
        }
    }
    return res.json (response) // send the response to React
})


// RESULTS PAGE
app.get('/resultspage/:search', (req, res) => {

    const search = req.params.search;

    const query = { "profile.profession": search }; // defining the query 

    // defining which fields need to be returned:  
    const projection = { _id: 1, "profile.fullName": 1, "profile.expYear": 1, "profile.headline": 1 }; 
    
    // using the find() method and passing the query and projection as parameters
    // this returns a document which holding an array of objects containing 'id' and 'profile'
    // 'profile' holds an object containing 'fullName', 'expYear' and 'headline' 
    User.find(query, projection, function(err, docs) {
      if (err) {
        console.error(err);
      }

      try {
        // creating a 'results' array which maps 'docs' 
        // 'results' array is in the format that React is expecting. it is an array of objects.
        const result = docs.map(doc => ({
            id: doc._id ,
            fullName: doc.profile[0].fullName,
            expYear: doc.profile[0].expYear,
            headline: doc.profile[0].headline,
          }));
          return res.json(result) // returns the 'results' array
      } catch (error){
          return res.json(error) // returns errors 
      }
    });
});

// USER PROFILE PAGE 
app.get('/userprofile/:userid', (req, res) => {
    const userid = req.params.userid; // retrieve the user ID 

    const query = { "_id": userid }; // defining the query 
    const projection = {_id: 0, "profile.fullName": 1, "profile.profession": 1, "profile.location": 1, 
                        "profile.expYear": 1,"profile.email": 1, "profile.phoneNum": 1, 
                        "profile.headline": 1,"profile.servicesAndProducts": 1,"profile.experience": 1,
    }; 

    User.find(query, projection, function(err, docs) {
        if (err) {
          console.error(err);
          return;
        }

        try {
            // creating a 'results' array which maps 'docs' 
            // 'results' array is in the format that React is expecting. it is an array of objects.
            const result = docs.map(doc => ({
                fullName: doc.profile[0].fullName,
                profession: doc.profile[0].profession,
                location: doc.profile[0].location,
                expYear: doc.profile[0].expYear,
                email: doc.profile[0].email,
                phoneNum: doc.profile[0].phoneNum,
                headline: doc.profile[0].headline,
                servicesAndProducts: doc.profile[0].servicesAndProducts,
                experience: doc.profile[0].experience,
              }));
              return res.json (result) // returns the 'results' array
          } catch (error){
              return res.json (error) // returns errors 
          }
    })
});


