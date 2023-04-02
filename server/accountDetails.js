import mongoose from "mongoose";

const profileSchema = mongoose.Schema ( 
    // stores the profile information
    {
        fullName: {type: String},
        profession: {type: String},
        location: {type: String},
        expYear: {type: String},
        email: {type: String},
        phoneNum: {type: String},
        headline: {type: String},
        servicesAndProducts: {type: String},
        experience: {type: String},
    }
)

const UserDetailsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,   
        },
        password:{
            type: String,
            required: true,
        },
        profile: [profileSchema], 
    },
    {collection: "UserInfo"},
);

const databaseSchema = mongoose.model('UserInfo' , UserDetailsSchema);
export default databaseSchema;

