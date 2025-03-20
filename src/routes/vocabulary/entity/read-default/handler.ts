import { Entity } from "@models";
import { schema } from "./model";
import { VocabularyEntityReadDefaultRequest, VocabularyEntityReadDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyEntityReadDefault(
  args: VocabularyEntityReadDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const entityDocument = await Entity.findOne({
      _id: args.id,
    });

    if (!entityDocument) {
      return jsonRpcError({
        callback,
        errorTypeMnemocode: JsonRpcErrorTypeMnemocode.EntityNotFound
      })
    }

    jsonRpcResult<VocabularyEntityReadDefaultResponse>({
      callback,
      result: {
        id: entityDocument.id,
        name: entityDocument.name,
        rows: entityDocument.rows
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
