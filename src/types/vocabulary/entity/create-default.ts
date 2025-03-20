export interface VocabularyEntityCreateDefaultRequest {
  name: string;
  rows: { fieldId: string; pos: number; col: number }[][];
}

export interface VocabularyEntityCreateDefaultResponse {
  id: string;
}
