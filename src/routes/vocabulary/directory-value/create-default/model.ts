import { object, string } from "yup";

export const schema = object().shape({
  name: string().required(),
  directoryId: string().required()
})