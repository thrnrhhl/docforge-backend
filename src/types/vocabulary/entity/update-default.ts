export interface VocabularyEntityUpdateDefaultRequest {
  id: string;
  name: string;
  rows: {fieldId: string;
    pos: number;
    col: number;}[][];
}

export interface VocabularyEntityUpdateDefaultResponse {
  id: string;
}
