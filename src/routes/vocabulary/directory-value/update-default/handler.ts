import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { schema } from "./model";
import { Directory, DirectoryValue } from "@models";
import slugify from "slugify";
import { v1VocabularyDirectoryValueUpdateDefaultRequest, v1VocabularyDirectoryValueUpdateDefaultResponse } from "@gen/server/vocabulary";
import { GrpcError } from "@shared/constants";

export async function v1VocabularyDirectoryValueUpdateDefault(
  call: ServerUnaryCall<
    v1VocabularyDirectoryValueUpdateDefaultRequest,
    v1VocabularyDirectoryValueUpdateDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyDirectoryValueUpdateDefaultResponse>
) {
  try {
    console.log(call.request);
    await schema.validate(call.request);
    
    const directoryDocument = await DirectoryValue.findOneAndUpdate({
      _id: call.request.id
    }, {
      name: call.request.name,
      value: slugify(call.request.name)
    });

    const response = v1VocabularyDirectoryValueUpdateDefaultResponse.create({
      id: directoryDocument!.id,
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
