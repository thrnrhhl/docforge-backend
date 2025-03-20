export interface VocabularyEntityReadDefaultRequest {
  id: string;
}

export interface VocabularyEntityReadDefaultResponse {
  id: string;
  name: string;
  rows: { fieldId: string; pos: number; col: number }[][];
}
