import { Directory } from "@models";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";
import { VocabularyDirectoryListDefaultRequest, VocabularyDirectoryListDefaultResponse } from "types";

export async function vocabularyDirectoryListDefault(
  _: VocabularyDirectoryListDefaultRequest,
  __: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    const directoryDocs = await Directory.find();

    jsonRpcResult<VocabularyDirectoryListDefaultResponse>({
      callback,
      result: directoryDocs.map(key => ({id: key.id, name: key.name}))
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
