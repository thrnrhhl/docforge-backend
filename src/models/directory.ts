import mongoose from 'mongoose';

interface Directory extends mongoose.Document {
  name: string;
  code: string;
}

const schema = new mongoose.Schema<Directory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface DirectoryDocument extends Document {}

export const Directory = mongoose.model("directory", schema);
