import { schema } from "./model";
import { Directory, Field } from "@models";
import { VocabularyFieldCreateDefaultRequest, VocabularyFieldCreateDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";


export async function vocabularyFieldCreateDefault(
  args: VocabularyFieldCreateDefaultRequest,
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
        return jsonRpcError({callback, errorTypeMnemocode: JsonRpcErrorTypeMnemocode.DirectoryNotFount});
      }
    }

    const fieldNewDoc = await Field.create({
      type: args.type,
      name: args.name,
      detail: args.detail,
    });


    jsonRpcResult<VocabularyFieldCreateDefaultResponse>({
      callback,
      result: {id: fieldNewDoc.id}
    })
  } catch (e) {
    jsonRpcError({callback, errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError})
  }
}
