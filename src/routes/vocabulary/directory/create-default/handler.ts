import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { schema } from "./model";
import { Directory } from "@models";
import slugify from "slugify";
import {
  v1VocabularyDirectoryCreateDefaultRequest,
  v1VocabularyDirectoryCreateDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyDirectoryCreateDefault(
  call: ServerUnaryCall<
  v1VocabularyDirectoryCreateDefaultRequest,
  v1VocabularyDirectoryCreateDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyDirectoryCreateDefaultResponse>
) {
  try {
    await schema.validate(call.request);

    const slugName = slugify(call.request.name);

    const directoryDocument = await Directory.create({
      name: call.request.name,
      code: slugName,
    });

    const response = v1VocabularyDirectoryCreateDefaultResponse.create({
      id: directoryDocument.id,
    });

    callback(null, response);
  } catch (e) {
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: "Произошла ошибка при создании справочника.",
      },
      null
    );
  }
}
