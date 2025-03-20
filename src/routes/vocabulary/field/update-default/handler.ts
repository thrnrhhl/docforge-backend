import { schema } from "./model";
import { Directory, Field } from "@models";
import { VocabularyFieldUpdateDefaultRequest, VocabularyFieldUpdateDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyFieldUpdateDefault(
  args: VocabularyFieldUpdateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    if (args.detail?.directoryId) {
      const directoryDocument = await Directory.findById(
        args.detail.directoryId
      );

      if (!directoryDocument) {
        return jsonRpcError({
          callback,
          errorTypeMnemocode: JsonRpcErrorTypeMnemocode.DirectoryNotFount
        })
      }
    }

    await Field.findOneAndUpdate(
      {
        _id: args.id,
      },
      {
        name: args.name,
        type: args.type,
        detail: args.detail,
      }
    );

    jsonRpcResult<VocabularyFieldUpdateDefaultResponse>({
      callback,
      result: {
        id: args.id,
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
