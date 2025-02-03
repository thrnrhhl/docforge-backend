import { v1VocabularyDirectoryListDefaultRequest, v1VocabularyDirectoryListDefaultResponse } from "@gen/server/vocabulary";
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { Directory } from "@models";

export async function v1VocabularyDirectoryListDefault(
  call: ServerUnaryCall<
  v1VocabularyDirectoryListDefaultRequest,
  v1VocabularyDirectoryListDefaultResponse
  >,
  callback: sendUnaryData<v1VocabularyDirectoryListDefaultResponse>
) {
  try {
    const directoryDocuments = await Directory.find();

    const response = v1VocabularyDirectoryListDefaultResponse.create({
      directory: directoryDocuments.map(key => ({id: key.id, name: key.name}))
    });

    callback(null, response);
  } catch (e) {
    callback(
      {
        code: status.INVALID_ARGUMENT,
        message: "Произошла ошибка при получении справочников.",
      },
      null
    );
  }
}
