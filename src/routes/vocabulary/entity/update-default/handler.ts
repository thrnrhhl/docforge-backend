import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { schema } from "./model";
import { Directory, Entity } from "@models";
import {
  v1VocabularyEntityUpdateDefaultRequest,
  v1VocabularyEntityUpdateDefaultResponse,
} from "@gen/server/vocabulary";
import { GrpcError } from "@shared/constants";

export async function v1VocabularyEntityUpdateDefault(
  call: ServerUnaryCall<
    v1VocabularyEntityUpdateDefaultRequest,
    v1VocabularyEntityUpdateDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyEntityUpdateDefaultResponse>
) {
  try {
    const formattingRows = call.request.rows.map(key => key.detailField)

    await schema.validate(call.request);


    await Entity.findOneAndUpdate(
      {
        _id: call.request.id,
      },
      {
        name: call.request.name,
        rows: formattingRows,
      }
    );

    const response = v1VocabularyEntityUpdateDefaultResponse.create({
      id: call.request.id,
    });

    callback(null, response);
  } catch (e) {
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: GrpcError.AN_ERROR_OCCURRED_WHILE_UPDATING_THE_DATA,
      },
      null
    );
  }
}
