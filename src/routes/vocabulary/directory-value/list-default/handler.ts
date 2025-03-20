import { DirectoryValue } from "@models";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";
import { VocabularyDirectoryValueListDefaultRequest, VocabularyDirectoryValueListDefaultResponse } from "types";

export async function vocabularyDirectoryValueListDefault(
  args: VocabularyDirectoryValueListDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    const directoryDocuments = await DirectoryValue.find({
      directoryRef: args.directoryId,
    });

    jsonRpcResult<VocabularyDirectoryValueListDefaultResponse>({
      callback,
      result: directoryDocuments.map((key) => ({
        id: key.id,
        name: key.name,
        directoryId: String(key.directoryRef),
      }))
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
