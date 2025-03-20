export interface VocabularyEntityRecordReadDefaultRequest {
  id: string;
}

export interface VocabularyEntityRecordReadDefaultResponse {
  id: string;
  entityId: string;
  entityRecordValue: {
    id?: string | undefined;
    entityRecordId: string;
    fieldId: string;
    detail: {
      fieldMnemocode: string;
      directoryValueId?: string | undefined;
      directoryValueIds: string[];
      text?: string | undefined;
      number?: number | undefined;
      date?: string | undefined;
    };
  }[];
}
