import { Schema, model } from "mongoose";

interface IUser {
  id: string,
  email: string,
  password: string,
  role: string,
}

export type ROLE_TYPES = 'ADMIN' | 'USER'

export const UserSchema = new Schema<IUser>({
  id: { type: String, default: null, unique: true },
  email: { type: String, default: null, unique: true },
  password: { type: String },
  role: { type: String }
});

const User = model("user", UserSchema);
export default User;