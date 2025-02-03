import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { Directory } from "@models";
import { schema } from "./model";
import { GrpcError } from "../../../../shared/constants";
import {
  v1VocabularyDirectoryReadDefaultRequest,
  v1VocabularyDirectoryReadDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyDirectoryReadDefault(
  call: ServerUnaryCall<
    v1VocabularyDirectoryReadDefaultRequest,
    v1VocabularyDirectoryReadDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyDirectoryReadDefaultResponse>
) {
  try {
    await schema.validate(call.request);

    const directoryDocument = await Directory.findOne({ _id: call.request.id });

    if (!directoryDocument) {
      return callback(
        {
          code: status.INVALID_ARGUMENT,
          message: GrpcError.DIRECTORY_NOT_FOUND,
        },
        null
      );
    }

    const response = v1VocabularyDirectoryReadDefaultResponse.create({
      directory: {
        id: directoryDocument.id,
        name: directoryDocument.name,
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
