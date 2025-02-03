import { array, number, object, string } from "yup";

export const schema = object().shape({
  name: string().required(),
  rows: array()
    .of(
      array().of(
        object({
          fieldId: string().required(),
          pos: number().required(),
          col: number().required(),
        })
      )
    )
    .default([]),
});
