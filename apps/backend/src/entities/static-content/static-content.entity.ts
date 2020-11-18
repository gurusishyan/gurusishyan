import * as mongoose from 'mongoose';
export class IStaticContent extends mongoose.Document {
  _id: string;
  route_name: string;
  label: {
    [key: string]: {
      [key: string]: string;
    };
  };
  placeholder: {
    [key: string]: {
      [key: string]: string;
    };
  };
  button: {
    [key: string]: {
      [key: string]: string;
    };
  };
  href: {
    [key: string]: {
      [key: string]: string;
    };
  };
}
const uniqueRouteValidator = async (route_name: string): Promise<boolean> =>
  await StaticContent.find({ route_name })
    .then((data) => (data.length ? true : false))
    .catch((err) => false);

export const UserEntity = new mongoose.Schema({
  route_name: {
    type: mongoose.Schema.Types.String,
    required: true,
    validate: uniqueRouteValidator,
  },
  label: {
    type: mongoose.Schema.Types.Mixed,
  },
  placeholder: {
    type: mongoose.Schema.Types.Mixed,
  },
  button: {
    type: mongoose.Schema.Types.Mixed,
  },
  href: {
    type: mongoose.Schema.Types.Mixed,
  },
});

export const StaticContent = mongoose.model<IStaticContent>(
  'StaticContent',
  UserEntity,
  'static_content'
);
