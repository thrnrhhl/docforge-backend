import mongoose from "mongoose";
import { FieldDocument } from "./field";

interface Entity extends mongoose.Document {
  name: string;
  fieldRefs: mongoose.PopulatedDoc<FieldDocument>[];
  rows: Array<
    Array<{
      fieldId: string;
      pos: number;
      col: number;
    }>
  >;
}

const FieldSchema = new mongoose.Schema(
  {
    fieldId: { type: String, required: true },
    pos: { type: Number, required: true },
    col: { type: Number, required: true }
  },
  { _id: false }
);

const schema = new mongoose.Schema<Entity>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    fieldRefs: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      default: []
    },
    rows: {
      type: [[FieldSchema]],
      default: []
    },
  },
  {
    timestamps: true,
  }
);

export interface EntityDocument extends Document {}

export const Entity = mongoose.model("entity", schema);




export interface EntityDetailField {
  entityRef: string;
  fieldId: string;
  pos: number;
  col: number;
  rowIndex: number;
}; 