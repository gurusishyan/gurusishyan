import * as mongoose from 'mongoose';
import { Implore } from '../implore/implore.entity';

export class IUserSchema extends mongoose.Document {
  _id: string;
  user_name?: string;
  user_email?: string;
  password?: string;
  user_role?: string;
  is_active?: boolean;
  created_on?: Date;
  token?: string;
  bookmarked_implores: string[];
  bookmarked_vibes: string[];
}
const isValidUserName = async (user_name: string) => {
  const users = await User.find({ user_name });
  if (users.length === 0) return true;
  return false;
};
const uniqueElements = (value, index, self) => {
  return self.indexOf(value) === index;
};

const filterArrays = async (value) => {
  const user = await User.find();
};
export const UserEntity = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    validate: isValidUserName,
  },
  user_email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
    select: false,
  },
  created_on: {
    type: String,
    required: true,
    default: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  },
  user_role: {
    type: String,
    required: true,
    enum: ['TEACHER', 'STUDENT', 'ADMIN', 'OTHERS'],
    default: 'OTHERS',
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  token: {
    type: String,
    required: false,
  },
  bookmarked_implores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Implore',
    },
  ],
  bookmarked_vibes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Vibe',
    },
  ],
});
UserEntity.pre("remove",(next,doc)=>{
  console.log(doc)
})
export const User = mongoose.model<IUserSchema>('User', UserEntity, 'user');

