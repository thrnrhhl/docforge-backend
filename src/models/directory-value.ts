import mongoose from 'mongoose';
import { DirectoryDocument } from './directory';

interface Directory extends mongoose.Document {
  name: string;
  directoryRef: mongoose.PopulatedDoc<DirectoryDocument>
  key: string;
  value: string;
}

const schema = new mongoose.Schema<Directory>(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    directoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "directory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface DirectoryValueDocument extends Document {}

export const DirectoryValue = mongoose.model("directory_value", schema);

schema.index({ directoryRef: 1, value: 1 });
