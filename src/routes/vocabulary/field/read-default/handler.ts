import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { Field } from "@models";
import { schema } from "./model";
import { GrpcError } from "../../../../shared/constants";
import {
  v1VocabularyFieldReadDefaultRequest,
  v1VocabularyFieldReadDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyFieldReadDefault(
  call: ServerUnaryCall<
  v1VocabularyFieldReadDefaultRequest,
    v1VocabularyFieldReadDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyFieldReadDefaultResponse>
) {
  try {
    await schema.validate(call.request);

    const fieldDocument = await Field.findOne({
      _id: call.request.id,
    });

    if (!fieldDocument) {
      return callback(
        {
          code: status.INVALID_ARGUMENT,
          message: GrpcError.ENTITY_NOT_FOUND,
        },
        null
      );
    }

    const response = v1VocabularyFieldReadDefaultResponse.create({
      field: {
        id: fieldDocument.id,
        name: fieldDocument.name,
        type: fieldDocument.type,
        detail: fieldDocument.detail
      },
    });

    callback(null, response);
  } catch (e) {
    console.log(e);
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: GrpcError.AN_ERROR_OCCURRED_WHILE_RECEIVING_THE_DATA,
      },
      null
    );
  }
}
