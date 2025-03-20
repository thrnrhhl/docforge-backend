export interface VocabularyDirectoryValueListDefaultRequest {
  directoryId: string;
}

export interface VocabularyDirectoryValueListDefaultResponse extends Array<{
  id: string;
  name: string;
  directoryId: string;
}>{

}
