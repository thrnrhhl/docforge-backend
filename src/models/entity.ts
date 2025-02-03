import mongoose from "mongoose";

interface Entity extends mongoose.Document {
  name: string;
  rows: Array<
    Array<{
      fieldId: string;
      pos: number;
      col: number;
    }>
  >;
}

const schema = new mongoose.Schema<Entity>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    rows: [
      [
        {
          type: Object,
        },
      ],
    ],
  },
  {
    timestamps: true,
  }
);

export interface EntityDocument extends Document {}

export const Entity = mongoose.model("entity", schema);
