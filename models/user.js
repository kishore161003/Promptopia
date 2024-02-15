import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "Email is required"],
    match: [ "Email is invalid"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
    required: [true, "Image is required!"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
