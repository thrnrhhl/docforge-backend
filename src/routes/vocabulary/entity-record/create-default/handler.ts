import { EntityRecord, EntityRecordValue, Field } from "@models";
import { FieldDocument } from "models/field";
import { VocabularyEntityRecordCreateDefaultRequest, VocabularyEntityRecordCreateDefaultResponse } from "types";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";

export async function vocabularyEntityRecordCreateDefault(
  args: VocabularyEntityRecordCreateDefaultRequest,
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

    const entityRecordNewDocument = await EntityRecord.create({
      entityRef: args.entityId,
      entityFieldValueRefs: [],
    });

    const entityRecordValueIds = [];

    for (const item of args.entityRecordValue) {
      const entityRecordValueDocument = await EntityRecordValue.create({
        fieldRef: item.fieldId,
        entityRecordRef: entityRecordNewDocument.id,
        detail: item.detail,
      });

      entityRecordValueIds.push(entityRecordValueDocument.id);
    }

    await EntityRecord.findOneAndUpdate(
      { _id: entityRecordNewDocument.id },
      {
        entityFieldValueRefs: entityRecordValueIds,
      }
    );

    jsonRpcResult<VocabularyEntityRecordCreateDefaultResponse>({
      callback,
      result: {
        id: entityRecordNewDocument.id
      }
    })
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError
    })
  }
}
