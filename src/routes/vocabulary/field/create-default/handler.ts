import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { schema } from "./model";
import { Directory, Field } from "@models";
import { GrpcError } from "@shared/constants";
import {
  v1VocabularyFieldCreateDefaultRequest,
  v1VocabularyFieldCreateDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyFieldCreateDefault(
  call: ServerUnaryCall<
    v1VocabularyFieldCreateDefaultRequest,
    v1VocabularyFieldCreateDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyFieldCreateDefaultResponse>
) {
  try {
    await schema.validate(call.request);

    if (call.request.detail?.directoryId) {
      const directoryDocument = await Directory.findById(
        call.request.detail.directoryId
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
    }

    const fieldNewDocument = await Field.create({
      type: call.request.type,
      name: call.request.name,
      detail: call.request.detail,
    });

    const response = v1VocabularyFieldCreateDefaultResponse.create({
      id: fieldNewDocument.id,
    });

    callback(null, response);
  } catch (e) {
    console.log(e);
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: GrpcError.AN_ERROR_OCCURRED_WHILE_SAVING_THE_DATA,
      },
      null
    );
  }
}
