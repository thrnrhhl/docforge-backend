import { EntityRecord, EntityRecordValue, Field } from "@models";
import { FieldDocument } from "models/field";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";
import { VocabularyEntityRecordUpdateDefaultRequest, VocabularyEntityRecordUpdateDefaultResponse } from "types";

export async function vocabularyEntityRecordUpdateDefault(
  args: VocabularyEntityRecordUpdateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    const fieldMap = new Map<string, FieldDocument>();

    const fieldDocuments = await Field.find({
      _id: { $in: args.entityRecordValue.map((key) => key.fieldId) },
    });

    fieldDocuments.forEach((item) => {
      fieldMap.set(item.id, item as any);
    });

    await EntityRecord.findOneAndUpdate({
      _id: args.id,
    }, {
      entityRef: args.entityId,
    });

    for(const item of args.entityRecordValue) {
      await EntityRecordValue.findOneAndUpdate({_id: item.id}, {
        detail: {
          ...item.detail
        }
      })
    }

    jsonRpcResult<VocabularyEntityRecordUpdateDefaultResponse>({
      callback,
      result: { id: args.id }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
