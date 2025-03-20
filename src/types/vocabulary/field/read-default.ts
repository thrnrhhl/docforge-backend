export interface VocabularyFieldReadDefaultRequest {
  id: string;
};

export interface VocabularyFieldReadDefaultResponse {
  id: string;
  name: string;
  type: string;
  detail: {
    label?: string;
    placeholder?: string;
    directoryId?: string
  }
}