import mongoose from "mongoose";
import { EntityDocument } from "./entity";
import { FieldDocument } from "./field";

interface EntityRecordValue extends mongoose.Document {
  entityRecordRef: mongoose.PopulatedDoc<EntityDocument>;
  fieldRef: mongoose.PopulatedDoc<FieldDocument>;
  
  detail: {
    fieldMnemocode: string;
    directoryValueId?: string;
    directoryValueIds: string[];
    text?: string;
    number?: number;
    date?: string;
  }
}

const schema = new mongoose.Schema<EntityRecordValue>({
  entityRecordRef: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'entity', 
    required: true 
  },

  fieldRef: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'field', 
    required: true 
  },

  detail: {
    fieldMnemocode: { 
      type: String, 
      required: true 
    },
    directoryValueId: { 
      type: String, 
      default: null 
    },
    directoryValueIds: { 
      type: [String], 
      default: [] 
    },
    text: { 
      type: String, 
      default: null 
    },
    number: { 
      type: Number, 
      default: null 
    },
    date: { 
      type: String, 
      default: null 
    }
  }
}, {
  timestamps: true
});

export interface EntityRecordValueDocument extends Document {}

export const EntityRecordValue = mongoose.model("entity_record_value", schema);
