import * as mongoose from 'mongoose';
import { customValidator } from '../validators';
export class IUserSchema extends mongoose.Document {
  //Common fields for all users
  _id: string;
  is_active?: boolean;
  created_on?: string;
  user_name?: string;
  user_email?: string;
  password?: string;
  user_image?: string;
  user_role?: string;
  phone?: string;

  token?: string;
  reset_password_token_exp?: number;
  reset_password_token?: string;

  bookmarked_implores: string[];
  bookmarked_vibes: string[];

  //Fields specific to Teachers
  classes_handled: Array<string>;
  teaching_sector?: string;
  board_of_education_teacher: string;
  subjects_handled?: Array<string>;
  teacher?: boolean;

  //Fields specific to Students
  student?: boolean;
  class_studying: string;
  board_of_education_student: string;
}

const isValidUserName = async (user_name: string) => {
  const users = await User.find({ user_name });
  if (users.length === 0) return true;
  return false;
};

export const UserEntity = new mongoose.Schema({
  // Common fields for all users
  user_name: {
    type: String,
    required: true,
    validate: isValidUserName,
  },
  user_image: {
    type: String,
    required: false,
  },
  reset_password_token: {
    type: String,
    required: false,
  },
  reset_password_token_exp: {
    type: Number,
    required: false,
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
  phone: {
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
  //Fields specific to Teachers

  classes_handled: [
    {
      type: String,
      required: false,
      validate: customValidator.validateClassesHandled,
    },
  ],
  teaching_sector: {
    type: String,
    required: false,
    validate: customValidator.validateTeachingSector,
  },
  teacher: {
    type: Boolean,
    required: false,
  },
  board_of_education_teacher: [
    {
      type: String,
      required: false,
      validate: customValidator.validateBoardOfEducation,
    },
  ],
  subjects_handled: [
    {
      type: String,
      required: false,
      validate: customValidator.validateSubjectsHandled,
    },
  ],

  // Fields specific to students
  student: {
    type: Boolean,
    required: false,
  },
  class_studying: {
    type: String,
    required: false,
    validate: customValidator.validateClassesHandled,
  },
  board_of_education_student: {
    type: String,
    required: false,
    validate: customValidator.validateBoardOfEducation,
  },
});

export const User = mongoose.model<IUserSchema>('User', UserEntity, 'user');
