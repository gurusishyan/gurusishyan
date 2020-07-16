import { IMetadata, MetadataSchema } from '../metadata/metadata.class';
import * as mongoose from 'mongoose';
export interface IVibeSchema extends mongoose.Document {
  _id: string;
  created: string;
  author: string;
  vibe_as_anonymous: Boolean;
  associated_implore: string;
  vibe_type: string;
  metadata: IMetadata;
  status: 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  upvotes: string[];
  downvotes: string[];
  views: string[];
}
export const VibeSchema = new mongoose.Schema({
  created: {
    type: String,
    default: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vibe_as_anonymous: {
    type: Boolean,
    required: true,
    default: false,
  },
  associated_implore: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Implore',
      required: false,
    },
  ],
  status: {
    type: String,
    enum: ['UNDER_REVIEW', 'APPROVED', 'REJECTED'],
    default: 'APPROVED',
  },
  metadata: MetadataSchema,
  vibe_type: {
    type: String,
    enum: ['ANSWER', 'NOTE'],
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
  downvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
});

export const Vibe = mongoose.model<IVibeSchema>('Vibe', VibeSchema, 'vibe');
