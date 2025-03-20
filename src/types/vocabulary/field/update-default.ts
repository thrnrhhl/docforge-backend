export interface VocabularyFieldUpdateDefaultRequest {
  id: string;
  name: string;
  type: string;
  detail: {
    label?: string;
    placeholder?: string;
    directoryId?: string
  }
};

export interface VocabularyFieldUpdateDefaultResponse {
  id: string;
}