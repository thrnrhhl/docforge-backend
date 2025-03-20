import { schema } from "./model";
import { Directory } from "@models";
import slugify from "slugify";
import { VocabularyDirectoryUpdateDefaultRequest, VocabularyDirectoryUpdateDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyDirectoryUpdateDefault(
  args: VocabularyDirectoryUpdateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const slugName = slugify(args.name);

    const directoryDoc = await Directory.findOneAndUpdate(
      {
        _id: args.id,
      },
      {
        name: args.name,
        code: slugName,
      }
    );

    jsonRpcResult<VocabularyDirectoryUpdateDefaultResponse>({
      callback,
      result: {
        id: directoryDoc!.id
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
