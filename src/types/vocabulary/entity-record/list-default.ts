export interface VocabularyEntityRecordListDefaultRequest {
  entityId: string;
}

export interface VocabularyEntityRecordListDefaultResponse
  extends Array<{
    id: string;
    entityId: string;
    entity?: {
      id: string;
      name: string;
      rows: {
        fieldId: string;
        pos: number;
        col: number;
      }[][];
    };
    entityRecordValue: {
      id?: string | undefined;
      entityRecordId: string;
      fieldId: string;
      detail?: {
        fieldMnemocode: string;
        directoryValueId?: string | undefined;
        directoryValueIds: string[];
        text?: string | undefined;
        number?: number | undefined;
        date?: string | undefined;
      };
    }[];
  }> {}
