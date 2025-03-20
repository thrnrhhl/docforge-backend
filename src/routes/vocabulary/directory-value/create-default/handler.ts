import { schema } from "./model";
import { Directory, DirectoryValue } from "@models";
import slugify from "slugify";
import { VocabularyDirectoryValueCreateDefaultRequest, VocabularyDirectoryValueCreateDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyDirectoryValueCreateDefault(
  args: VocabularyDirectoryValueCreateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const directoryDoc = await Directory.findById(
      args.directoryId
    );

    if (!directoryDoc) {
      return jsonRpcError({
        callback,
        errorTypeMnemocode: JsonRpcErrorTypeMnemocode.DirectoryNotFount
      })
    }

    const directoryValueCreateDoc = await DirectoryValue.create({
      name: args.name,
      value: slugify(args.name),
      directoryRef: args.directoryId,
    });

    jsonRpcResult<VocabularyDirectoryValueCreateDefaultResponse>({
      callback,
      result: {
        id: directoryValueCreateDoc.id
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
