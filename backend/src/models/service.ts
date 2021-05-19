import { Document, model, Types, Schema } from 'mongoose';

export interface IService extends Document{
  _id: Types.ObjectId;
  name: string;
  preset?: boolean;
  groupId: string;
  createdAt: Date;
  updatedAt?: Date;
}

const serviceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  preset: {
    type: Boolean,
    default: false,
    required: true,
  },
  groupId: {
    type: String,
    ref: 'Group',
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

export default model<IService>('Service', serviceSchema);
