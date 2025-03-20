import { Field } from "@models";
import {
  JsonRpcCallback,
  JsonRpcContext,
  JsonRpcErrorTypeMnemocode,
  jsonRpcError,
  jsonRpcResult,
} from "@shared/jsonrpc";
import {
  VocabularyFieldListDefaultRequest,
  VocabularyFieldListDefaultResponse,
} from "types";

export async function vocabularyFieldListDefault(
  args: VocabularyFieldListDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    const fieldDocs = await Field.find();

    jsonRpcResult<VocabularyFieldListDefaultResponse>({
      callback,
      result: fieldDocs.map((key) => ({
        id: key.id,
        name: key.name,
        type: key.type,
        detail: key.detail,
      })),
    });
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.DirectoryNotFount,
    });
  }
}
