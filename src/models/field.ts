import mongoose from 'mongoose';

interface Field extends mongoose.Document {
  name: string;
  type: string;
  detail: {
    label?: string;
    placeholder?: string;
    directoryId?: string;
  }
}

const schema = new mongoose.Schema<Field>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    detail: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

export interface FieldDocument extends Document {}

export const Field = mongoose.model("field", schema);
