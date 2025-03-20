import { array, number, object, string } from "yup";

const fieldSchema = object({
  fieldId: string().required(),
  pos: number().required(),
  col: number().required(),
});

export const schema = object().shape({
  id: string().required(),
  name: string().required(),
  rows: array().of(array().of(fieldSchema).required()).required(),
});