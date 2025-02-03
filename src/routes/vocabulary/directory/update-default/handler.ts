import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { schema } from "./model";
import { Directory } from "@models";
import slugify from "slugify";
import {
  v1VocabularyDirectoryUpdateDefaultRequest,
  v1VocabularyDirectoryUpdateDefaultResponse,
} from "@gen/server/vocabulary";

export async function v1VocabularyDirectoryUpdateDefault(
  call: ServerUnaryCall<
    v1VocabularyDirectoryUpdateDefaultRequest,
    v1VocabularyDirectoryUpdateDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyDirectoryUpdateDefaultResponse>
) {
  try {
    await schema.validate(call.request);

    const slugName = slugify(call.request.name);

    const directoryDocument = await Directory.findOneAndUpdate(
      {
        _id: call.request.id,
      },
      {
        name: call.request.name,
        code: slugName,
      }
    );

    const response = v1VocabularyDirectoryUpdateDefaultResponse.create(
      {
        id: directoryDocument!.id,
      }
    );

    callback(null, response);
  } catch (e) {
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: "Произошла ошибка при обновлении справочника.",
      },
      null
    );
  }
}
