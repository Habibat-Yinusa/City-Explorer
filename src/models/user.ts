import mongoose, { Schema, Document } from 'mongoose';

interface UserAttributes {
  username: string;
  email: string;
  password: string;
}

interface UserDocument extends UserAttributes, Document {}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;

