import mongoose from "mongoose";
import { EntityDocument } from "./entity";

interface EntityRecord extends mongoose.Document {
  entityRef: mongoose.PopulatedDoc<EntityDocument>;
  entityFieldValueRefs: mongoose.ObjectId[];
}

const schema = new mongoose.Schema<EntityRecord>(
  {
    entityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "entity",
      required: true,
    },
    entityFieldValueRefs: {
      type: [{type: mongoose.Schema.Types.ObjectId}],
      ref: "entity_record_value",
      default: []
    },
  },
  {
    timestamps: true,
  }
);

export interface EntityRecordDocument extends Document {}

export const EntityRecord = mongoose.model("entity_record", schema);
