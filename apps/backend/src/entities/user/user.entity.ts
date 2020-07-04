import * as mongoose from 'mongoose';

export class IUserSchema extends mongoose.Document {
  _id: string;
  user_name?: string;
  user_email?: string;
  password?: string;
  user_role?: string;
  is_active?: boolean;
  created_on?: Date;
  token?: string;
}
const isValidUserName = async (user_name: string) => {
  const users = await User.find({ user_name });
  if (users.length === 0) return true;
  return false;
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
    select:false
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
});
export const User = mongoose.model<IUserSchema>('User', UserEntity, 'user');
