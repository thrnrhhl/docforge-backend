export interface VocabularyFieldListDefaultRequest {

};

export interface VocabularyFieldListDefaultResponse extends Array<{
  id: string;
  name: string;
  type: string;
  detail: {
    label?: string;
    placeholder?: string;
    directoryId?: string
  }
}>{}