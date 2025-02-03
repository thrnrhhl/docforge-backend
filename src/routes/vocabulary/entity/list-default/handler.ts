import {
  v1VocabularyEntityListDefaultRequest,
  v1VocabularyEntityListDefaultResponse,
} from "@gen/server/vocabulary";
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";

import { Entity } from "@models";
import { GrpcError } from "@shared/constants";

export async function v1VocabularyEntityListDefault(
  call: ServerUnaryCall<
    v1VocabularyEntityListDefaultRequest,
    v1VocabularyEntityListDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyEntityListDefaultResponse>
) {
  try {
    const entityDocuments = await Entity.find();

    const response = v1VocabularyEntityListDefaultResponse.create({
      entity: entityDocuments.map((key) => ({
        id: key.id,
        name: key.name,
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
