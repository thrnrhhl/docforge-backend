export interface VocabularyEntityListDefaultRequest {}

export interface VocabularyEntityListDefaultResponse
  extends Array<{
    id: string;
    name: string;
    rows: { fieldId: string; pos: number; col: number }[][];
  }> {}
