import { schema } from "./model";
import { Directory } from "@models";
import slugify from "slugify";
import { VocabularyDirectoryCreateDefaultRequest, VocabularyDirectoryCreateDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyDirectoryCreateDefault(
  args: VocabularyDirectoryCreateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const slugName = slugify(args.name);

    const directoryDoc = await Directory.create({
      name: args.name,
      code: slugName,
    });


    jsonRpcResult<VocabularyDirectoryCreateDefaultResponse>({
      callback,
      result: {
        id: directoryDoc.id
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
