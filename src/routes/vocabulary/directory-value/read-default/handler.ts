import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { DirectoryValue } from "@models";
import { schema } from "./model";
import { GrpcError } from "../../../../shared/constants";
import {
  v1VocabularyDirectoryValueReadDefaultRequest,
  v1VocabularyDirectoryValueReadDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyDirectoryValueReadDefault(
  call: ServerUnaryCall<
    v1VocabularyDirectoryValueReadDefaultRequest,
    v1VocabularyDirectoryValueReadDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyDirectoryValueReadDefaultResponse>
) {
  try {
    await schema.validate(call.request);

    const directoryValueDocument = await DirectoryValue.findOne({
      _id: call.request.id,
    });

    if (!directoryValueDocument) {
      return callback(
        {
          code: status.INVALID_ARGUMENT,
          message: GrpcError.ENTITY_NOT_FOUND,
        },
        null
      );
    }

    const response = v1VocabularyDirectoryValueReadDefaultResponse.create({
      directoryValue: {
        id: directoryValueDocument.id,
        name: directoryValueDocument.name,
        directoryId: String(directoryValueDocument.directoryRef),
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
