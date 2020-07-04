import * as mongoose from 'mongoose';
export class IStaticDataSchema extends mongoose.Document {
  _id: string;
  data_label_key: string;
  data_label_type: string;
  data_label_value: string;
}
export const StaticDataEntity = new mongoose.Schema({
  data_label_key: {
    type: String,
    required: true,
  },
  data_label_type: {
    type: String,
    required: true,
  },
  data_label_value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

export const StaticData = mongoose.model<IStaticDataSchema>(
  'StaticData',
  StaticDataEntity,
  'static_data'
);
