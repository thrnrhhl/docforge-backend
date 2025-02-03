import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { schema } from "./model";
import { Directory, DirectoryValue } from "@models";
import slugify from "slugify";
import { GrpcError } from "@shared/constants";
import {
  v1VocabularyDirectoryValueCreateDefaultRequest,
  v1VocabularyDirectoryValueCreateDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyDirectoryValueCreateDefault(
  call: ServerUnaryCall<
    v1VocabularyDirectoryValueCreateDefaultRequest,
    v1VocabularyDirectoryValueCreateDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyDirectoryValueCreateDefaultResponse>
) {
  try {
    await schema.validate(call.request);

    const directoryDocument = await Directory.findById(
      call.request.directoryId
    );

    if (!directoryDocument) {
      return callback(
        {
          code: status.INVALID_ARGUMENT,
          message: GrpcError.DIRECTORY_NOT_FOUND,
        },
        null
      );
    }

    const directoryValueDocument = await DirectoryValue.create({
      name: call.request.name,
      value: slugify(call.request.name),
      directoryRef: call.request.directoryId,
    });

    const response = v1VocabularyDirectoryValueCreateDefaultResponse.create({
      id: directoryValueDocument.id,
    });

    callback(null, response);
  } catch (e) {
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: GrpcError.AN_ERROR_OCCURRED_WHILE_SAVING_THE_DATA,
      },
      null
    );
  }
}
