import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { schema } from "./model";
import { Entity } from "@models";
import { GrpcError } from "@shared/constants";
import {
  v1VocabularyEntityCreateDefaultRequest,
  v1VocabularyEntityCreateDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyEntityCreateDefault(
  call: ServerUnaryCall<
    v1VocabularyEntityCreateDefaultRequest,
    v1VocabularyEntityCreateDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyEntityCreateDefaultResponse>
) {
  try {
    const formattingRows = call.request.rows.map(key => key.detailField)

    await schema.validate(formattingRows);

    const entityNewDocument = await Entity.create({
      name: call.request.name,
      rows: formattingRows
    });

    const response = v1VocabularyEntityCreateDefaultResponse.create({
      id: entityNewDocument.id,
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
