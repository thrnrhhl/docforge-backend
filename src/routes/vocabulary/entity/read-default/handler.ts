import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { Entity } from "@models";
import { schema } from "./model";
import { GrpcError } from "../../../../shared/constants";
import {
  v1VocabularyEntityReadDefaultRequest,
  v1VocabularyEntityReadDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyEntityReadDefault(
  call: ServerUnaryCall<
    v1VocabularyEntityReadDefaultRequest,
    v1VocabularyEntityReadDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyEntityReadDefaultResponse>
) {
  try {
    await schema.validate(call.request);

    const entityDocument = await Entity.findOne({
      _id: call.request.id,
    });

    if (!entityDocument) {
      return callback(
        {
          code: status.INVALID_ARGUMENT,
          message: GrpcError.ENTITY_NOT_FOUND,
        },
        null
      );
    }

    const response = v1VocabularyEntityReadDefaultResponse.create({
      entity: {
        id: entityDocument.id,
        name: entityDocument.name,
        rows: entityDocument.rows.map((key) => ({ detailField: key })),
      },
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
