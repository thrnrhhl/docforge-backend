import { schema } from "./model";
import { Entity } from "@models";
import { VocabularyEntityCreateDefaultRequest, VocabularyEntityCreateDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyEntityCreateDefault(
  args: VocabularyEntityCreateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate({name: args.name, rows: args.rows});

    const entityCreateDoc = await Entity.create({
      name: args.name,
      rows: args.rows
    });

    jsonRpcResult<VocabularyEntityCreateDefaultResponse>({
      callback,
      result: { id: entityCreateDoc.id }
    });
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    });
  }
}
