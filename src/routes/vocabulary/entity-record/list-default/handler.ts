import { Entity, EntityRecord, EntityRecordValue } from "@models";
import { JsonRpcCallback, JsonRpcContext, JsonRpcErrorTypeMnemocode, jsonRpcError, jsonRpcResult } from "@shared/jsonrpc";
import { VocabularyEntityRecordListDefaultRequest, VocabularyEntityRecordListDefaultResponse } from "types";

export async function vocabularyEntityRecordListDefault(
  args: VocabularyEntityRecordListDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    const entityRecordDocuments = await EntityRecord.find({
      entityRef: args.entityId
    });

    const result: VocabularyEntityRecordListDefaultResponse = [];

    for(const item of entityRecordDocuments) {
      const [entityRecordValueDocument, entityDocument] = await Promise.all([
        EntityRecordValue.find({
          _id: { $in: item.entityFieldValueRefs }
        }),
        Entity.findById(item.entityRef)
      ]);

      if(!entityDocument) {
        return jsonRpcError({ callback,errorTypeMnemocode: JsonRpcErrorTypeMnemocode.EntityNotFound })
      }

      result.push({
        id: item.id,
        entityId: String(item.entityRef),
        entity: {
          id: entityDocument.id,
          name: entityDocument.name,
          rows: entityDocument.rows
        },
        entityRecordValue: entityRecordValueDocument.map(key => ({
          id: key.id,
          entityRecordId: String(key.entityRecordRef),
          fieldId: String(key.fieldRef),
          detail: key.detail
        }))
      })
    }



    jsonRpcResult<VocabularyEntityRecordListDefaultResponse>({
      callback,
      result: result
    })
  } catch (e) {
    jsonRpcError({ callback,errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError })
  }
}
