import {
  v1VocabularyDirectoryValueListDefaultRequest,
  v1VocabularyDirectoryValueListDefaultResponse,
} from "@gen/server/vocabulary";
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";

import { DirectoryValue } from "@models";
import { GrpcError } from "@shared/constants";

export async function v1VocabularyDirectoryValueListDefault(
  call: ServerUnaryCall<
    v1VocabularyDirectoryValueListDefaultRequest,
    v1VocabularyDirectoryValueListDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyDirectoryValueListDefaultResponse>
) {
  try {
    const directoryDocuments = await DirectoryValue.find({
      directoryRef: call.request.directoryId,
    });

    const response = v1VocabularyDirectoryValueListDefaultResponse.create({
      directoryValue: directoryDocuments.map((key) => ({
        id: key.id,
        name: key.name,
        directoryId: String(key.directoryRef),
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
