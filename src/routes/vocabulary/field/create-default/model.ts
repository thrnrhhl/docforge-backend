import { object, string } from "yup";

export const schema = object().shape({
  type: string().required(),
  name: string().required(),
});