import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
        confirmPassword: String
    },
    {collection: "UserInfo",}
);
mongoose.model('UserInfo' , UserDetailsSchema);

export default UserDetailsSchema;

