import { Document, model, Types, Schema } from 'mongoose';

export interface IProfile extends Document {
  _id: Types.ObjectId;
  name: string;
  accessKeyId: string;
  accessKeySecret: string;
  region: string;
  outputFormat: string;
  createdAt: Date;
  updatedAt?: Date;
}

const profileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  accessKeyId: {
    type: String,
    required: true,
  },
  accessKeySecret: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    default: 'us-east-1',
    required: true,
  },
  outputFormat: {
    type: String,
    default: 'json',
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: false,
  },
  updatedAt: {
    type: Date,
  },
});

export default model<IProfile>('Profile', profileSchema);
