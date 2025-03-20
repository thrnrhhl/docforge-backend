import { Entity } from "@models";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";
import { VocabularyEntityListDefaultRequest, VocabularyEntityListDefaultResponse } from "types";

export async function vocabularyEntityListDefault(
  _: VocabularyEntityListDefaultRequest,
  __: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    const entityDocuments = await Entity.find();

    jsonRpcResult<VocabularyEntityListDefaultResponse>({
      callback,
      result: entityDocuments.map((key) => ({
        id: key.id,
        name: key.name,
        rows: key.rows
      }))
    });
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    });
  }
}
