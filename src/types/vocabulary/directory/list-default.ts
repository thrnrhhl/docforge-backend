export interface VocabularyDirectoryListDefaultRequest {}

export interface VocabularyDirectoryListDefaultResponse
  extends Array<{
    id: string;
    name: string;
  }> {}
