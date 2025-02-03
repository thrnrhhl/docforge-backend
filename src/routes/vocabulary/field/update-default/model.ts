import { object, string } from "yup";

export const schema = object().shape({
  id: string().required(),
  type: string().required(),
  name: string().required(),
})