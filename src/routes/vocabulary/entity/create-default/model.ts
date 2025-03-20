import { array, number, object, string } from "yup";

const fieldSchema = object({
  fieldId: string().required(),
  pos: number().required(),
  col: number().required(),
});

export const schema = object().shape({
  name: string().required(),
  rows: array().of(array().of(fieldSchema).required()).required(),
});
