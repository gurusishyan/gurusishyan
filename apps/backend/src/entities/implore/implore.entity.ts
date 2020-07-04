import { MetadataDTO } from '../metadata/metadata.class';
import * as mongoose from 'mongoose';
import { MetadataSchema } from '../metadata/metadata.class';
export class IImploreSchema extends mongoose.Document {
  _id: string;
  created: string;
  author: string;
  implore_as_anonymous: boolean;
  associated_vibe: string[];
  implore_type: string;
  metadata: MetadataDTO;
  status: 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  upvotes: string[];
  downvotes: string[];
  views: string[];
}
export const ImploreEntity = new mongoose.Schema({
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
  implore_as_anonymous: {
    type: Boolean,
    required: true,
    default: false,
  },
  associated_vibe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vibe',
      required: false,
    },
  ],
  status: {
    type: String,
    enum: ['UNDER_REVIEW', 'APPROVED', 'REJECTED'],
    default: 'APPROVED',
  },
  metadata: MetadataSchema,
  implore_type: {
    type: String,
    enum: ['QUESTION', 'NOTES'],
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
export const Implore = mongoose.model<IImploreSchema>(
  'Implore',
  ImploreEntity,
  'implore'
);
