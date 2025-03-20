import { array, number, object, string } from "yup";

const entityRecordValueSchema = object({
  id: string().required(),
  fieldMnemocode: string().required(),
  directoryValueId: string().notRequired(),
  directoryValueIds: array().of(string().required()).default([]),
  text: string().notRequired(),
  number: number().notRequired(),
  date: string().notRequired(),
});

export const schema = object().shape({
  entityId: string().required(),
  entityRecordValue: array().of(array().of(entityRecordValueSchema).required()).required(),
});
