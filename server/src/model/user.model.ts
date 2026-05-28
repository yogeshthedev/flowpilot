import mongoose, { Types } from "mongoose";

export interface IUser extends Document{
  _id: Types.ObjectId; 
  name: string;
  email: string;
  password: string;
  avatarUrl:string
}

const userSchema: mongoose.Schema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema);
