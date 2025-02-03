import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { schema } from "./model";
import { Directory, Field } from "@models";
import {
  v1VocabularyFieldUpdateDefaultRequest,
  v1VocabularyFieldUpdateDefaultResponse,
} from "@gen/server/vocabulary";
import { GrpcError } from "@shared/constants";

export async function v1VocabularyFieldUpdateDefault(
  call: ServerUnaryCall<
    v1VocabularyFieldUpdateDefaultRequest,
    v1VocabularyFieldUpdateDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyFieldUpdateDefaultResponse>
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

    await Field.findOneAndUpdate(
      {
        _id: call.request.id,
      },
      {
        name: call.request.name,
        type: call.request.type,
        detail: call.request.detail,
      }
    );

    const response = v1VocabularyFieldUpdateDefaultResponse.create({
      id: call.request.id,
    });

    callback(null, response);
  } catch (e) {
    console.log(e);
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: GrpcError.AN_ERROR_OCCURRED_WHILE_UPDATING_THE_DATA,
      },
      null
    );
  }
}
