export interface VocabularyFieldCreateDefaultRequest {
  name: string;
  type: string;
  detail: {
    label?: string;
    placeholder?: string;
    directoryId?: string
  }
};

export interface VocabularyFieldCreateDefaultResponse {
  id: string;
}