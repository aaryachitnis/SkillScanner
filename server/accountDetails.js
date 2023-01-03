import mongoose from "mongoose";

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

mongoose.model('UserInfo' , UserDetailsSchema);
export default UserDetailsSchema;

