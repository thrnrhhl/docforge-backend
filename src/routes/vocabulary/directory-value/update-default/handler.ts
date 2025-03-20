import { schema } from "./model";
import { DirectoryValue } from "@models";
import slugify from "slugify";
import { VocabularyDirectoryValueUpdateDefaultRequest } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyDirectoryValueUpdateDefault(
  args:VocabularyDirectoryValueUpdateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);
    
    const directoryDocument = await DirectoryValue.findOneAndUpdate({
      _id: args.id
    }, {
      name: args.name,
      value: slugify(args.name)
    });

    jsonRpcResult({
      callback,
      result: {
        id: directoryDocument!.id
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
