import { Directory } from "@models";
import { schema } from "./model";
import { VocabularyDirectoryReadDefaultRequest, VocabularyDirectoryReadDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyDirectoryReadDefault(
  args: VocabularyDirectoryReadDefaultRequest,
  __: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const directoryDoc = await Directory.findOne({ _id: args.id });

    if (!directoryDoc) {
      return jsonRpcError({
        callback,
        errorTypeMnemocode: JsonRpcErrorTypeMnemocode.DirectoryNotFount
      })
    }

    jsonRpcResult<VocabularyDirectoryReadDefaultResponse>({
      callback,
      result: {
        id: directoryDoc.id,
        name: directoryDoc.name,
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
