import { DirectoryValue } from "@models";
import { schema } from "./model";

import {
  VocabularyDirectoryValueReadDefaultRequest,
  VocabularyDirectoryValueReadDefaultResponse,
} from "types";
import {
  JsonRpcCallback,
  JsonRpcContext,
  JsonRpcErrorTypeMnemocode,
  jsonRpcError,
  jsonRpcResult,
} from "@shared/jsonrpc";

export async function vocabularyDirectoryValueReadDefault(
  args: VocabularyDirectoryValueReadDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const directoryValueDoc = await DirectoryValue.findOne({
      _id: args.id,
    });

    if (!directoryValueDoc) {
      return jsonRpcError({
        callback,
        errorTypeMnemocode: JsonRpcErrorTypeMnemocode.DirectoryNotFount,
      });
    }

    jsonRpcResult<VocabularyDirectoryValueReadDefaultResponse>({
      callback,
      result: {
        id: directoryValueDoc.id,
        name: directoryValueDoc.name,
        directoryId: String(directoryValueDoc.directoryRef),
      },
    });
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError,
    });
  }
}
