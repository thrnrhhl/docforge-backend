export interface VocabularyEntityRecordCreateDefaultRequest {
  entityId: string;
  entityRecordValue: {
    id?: string | undefined;
    entityRecordId: string;
    fieldId: string;
    detail:
      | {
          fieldMnemocode: string;
          directoryValueId?: string | undefined;
          directoryValueIds: string[];
          text?: string | undefined;
          number?: number | undefined;
          date?: string | undefined;
        }
      | undefined;
  }[];
}

export interface VocabularyEntityRecordCreateDefaultResponse {
  id: string;
}
