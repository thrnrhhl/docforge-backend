import { Entity, Field } from "@models";
import { schema } from "./model";
import { VocabularyEntityReadDefaultRequest, VocabularyEntityReadDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyEntityListSelectedFields(
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

    const fieldIdList = entityDocument.rows.flatMap(key => key).map(key => key.fieldId);

    const fieldDocs = await Field.find({ _id: { $in: fieldIdList } });

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
