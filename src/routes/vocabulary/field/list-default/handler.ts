import {
  v1VocabularyFieldListDefaultRequest,
  v1VocabularyFieldListDefaultResponse,
} from "@gen/server/vocabulary";
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";

import { Field } from "@models";
import { GrpcError } from "@shared/constants";

export async function v1VocabularyFieldListDefault(
  call: ServerUnaryCall<
    v1VocabularyFieldListDefaultRequest,
    v1VocabularyFieldListDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyFieldListDefaultResponse>
) {
  try {
    const fieldDocuments = await Field.find();

    const response = v1VocabularyFieldListDefaultResponse.create({
      field: fieldDocuments.map((key) => ({
        id: key.id,
        name: key.name,
        type: key.type,
        detail: key.detail
      })),
    });

    callback(null, response);
  } catch (e) {
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: GrpcError.AN_ERROR_OCCURRED_WHILE_RECEIVING_THE_DATA,
      },
      null
    );
  }
}
