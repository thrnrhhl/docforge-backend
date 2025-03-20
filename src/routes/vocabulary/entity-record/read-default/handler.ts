import { EntityRecord, EntityRecordValue } from "@models";
import { schema } from "./model";
import { VocabularyEntityRecordReadDefaultRequest, VocabularyEntityRecordReadDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyEntityRecordReadDefault(
  args: VocabularyEntityRecordReadDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const entityRecordDocument = await EntityRecord.findOne({
      _id: args.id,
    }).populate("entityFieldValueRefs");

    if (!entityRecordDocument) {
      return jsonRpcError({
        callback,
        errorTypeMnemocode: JsonRpcErrorTypeMnemocode.EntityNotFound
      })
    }

    const entityRecordValueDocuments = await EntityRecordValue.find({
      _id: { $in: entityRecordDocument.entityFieldValueRefs },
    });

    const entityRecordValue: VocabularyEntityRecordReadDefaultResponse["entityRecordValue"] =
      entityRecordValueDocuments.map((key) => ({
        id: key.id,
        entityRecordId: String(key.entityRecordRef),
        fieldId: String(key.fieldRef),
        detail: key.detail,
      }));

    jsonRpcResult<VocabularyEntityRecordReadDefaultResponse>({
      callback,
      result: {
        id: entityRecordDocument.id,
        entityId: String(entityRecordDocument.entityRef),
        entityRecordValue: entityRecordValue,
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
