import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
    },
    {collection: "UserInfo",}
);

// password encryption 
UserDetailsSchema.pre('save', function (next){ // this function is executed before the save function 
    if (this.isModified('password')){ // if password has been modified it is hashed 
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);
            // updates value of the password variable to the hashed value 
            this.password = hash;
            next();
        })
    }
})

mongoose.model('UserInfo' , UserDetailsSchema);
export default UserDetailsSchema;

