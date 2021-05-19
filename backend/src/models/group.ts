import { Document, model, Types, Schema } from 'mongoose';

export interface IGroup extends Document {
  _id: Types.ObjectId;
  name: string;
  preset?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const groupSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  preset: {
    type: Boolean,
    default: false,
    required: false,
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

export default model<IGroup>('Group', groupSchema);
