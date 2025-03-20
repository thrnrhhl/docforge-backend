import { Field } from "@models";
import { schema } from "./model";
import { VocabularyFieldReadDefaultRequest, VocabularyFieldReadDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyFieldReadDefault(
  args: VocabularyFieldReadDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const fieldDocument = await Field.findOne({
      _id: args.id,
    });

    if (!fieldDocument) {
      return jsonRpcError({
        callback,
        errorTypeMnemocode: JsonRpcErrorTypeMnemocode.FieldNotFound
      })
    }

    jsonRpcResult<VocabularyFieldReadDefaultResponse>({
      callback,
      result: {
        id: fieldDocument.id,
        name: fieldDocument.name,
        type: fieldDocument.type,
        detail: fieldDocument.detail
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
