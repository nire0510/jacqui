import { Document, model, Types, Schema } from 'mongoose';

export interface IQuery extends Document {
  _id: Types.ObjectId;
  title: string;
  aws: string;
  jq?: string;
  preset?: boolean;
  favorite?: boolean;
  serviceId: string;
  createdAt: Date;
  updatedAt?: Date;
}

const querySchema: Schema = new Schema({
  serviceId: {
    type: String,
    ref: 'Service',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  aws: {
    type: String,
    required: true,
  },
  jq: {
    type: String,
    required: false,
  },
  favorite: {
    type: Boolean,
    required: false,
  },
  preset: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

export default model<IQuery>('Query', querySchema);
