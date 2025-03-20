import { schema } from "./model";
import { Entity } from "@models";
import { VocabularyEntityUpdateDefaultRequest, VocabularyEntityUpdateDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyEntityUpdateDefault(
  args: VocabularyEntityUpdateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {

    await schema.validate({ id: args.id, name: args.name, rows: args.rows});


    await Entity.findOneAndUpdate(
      {
        _id: args.id,
      },
      {
        name: args.name,
        rows: args.rows,
      }
    );


    jsonRpcResult<VocabularyEntityUpdateDefaultResponse>({
      callback,
      result: {
        id: args.id
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
