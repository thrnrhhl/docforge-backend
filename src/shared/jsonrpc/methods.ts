import { vocabularyDirectoryCreateDefault, vocabularyDirectoryListDefault, vocabularyDirectoryReadDefault, vocabularyDirectoryUpdateDefault, vocabularyDirectoryValueCreateDefault, vocabularyDirectoryValueListDefault, vocabularyDirectoryValueReadDefault, vocabularyDirectoryValueUpdateDefault, vocabularyEntityCreateDefault, vocabularyEntityListDefault, vocabularyEntityReadDefault, vocabularyEntityRecordCreateDefault, vocabularyEntityRecordListDefault, vocabularyEntityRecordReadDefault, vocabularyEntityRecordUpdateDefault, vocabularyEntityUpdateDefault, vocabularyFieldCreateDefault, vocabularyFieldListDefault, vocabularyFieldReadDefault, vocabularyFieldUpdateDefault } from "@routes";
import jayson from "jayson";

export type JsonRpcMethodsType = { [methodName: string]: jayson.MethodLike };

export enum JsonRpcMethodMnemocode {
  VocabularyDirectoryCreateDefault = "Vocabulary.Directory.Create.Default",
  VocabularyDirectoryListDefault = "Vocabulary.Directory.List.Default",
  VocabularyDirectoryReadDefault = "Vocabulary.Directory.Read.Default",
  VocabularyDirectoryUpdateDefault = "Vocabulary.Directory.Update.Default",

  VocabularyDirectoryValueCreateDefault = "Vocabulary.DirectoryValue.Create.Default",
  VocabularyDirectoryValueListDefault = "Vocabulary.DirectoryValue.List.Default",
  VocabularyDirectoryValueReadDefault = "Vocabulary.DirectoryValue.Read.Default",
  VocabularyDirectoryValueUpdateDefault = "Vocabulary.DirectoryValue.Update.Default",

  VocabularyEntityCreateDefault = "Vocabulary.Entity.Create.Default",
  VocabularyEntityListDefault = "Vocabulary.Entity.List.Default",
  VocabularyEntityReadDefault = "Vocabulary.Entity.Read.Default",
  VocabularyEntityUpdateDefault = "Vocabulary.Entity.Update.Default",

  VocabularyEntityRecordCreateDefault = "Vocabulary.EntityRecord.Create.Default",
  VocabularyEntityRecordListDefault = "Vocabulary.EntityRecord.List.Default",
  VocabularyEntityRecordReadDefault = "Vocabulary.EntityRecord.Read.Default",
  VocabularyEntityRecordUpdateDefault = "Vocabulary.EntityRecord.Update.Default",

  VocabularyFieldCreateDefault = "Vocabulary.Field.Create.Default",
  VocabularyFieldListDefault = "Vocabulary.Field.List.Default",
  VocabularyFieldReadDefault = "Vocabulary.Field.Read.Default",
  VocabularyFieldUpdateDefault = "Vocabulary.Field.Update.Default",
}

export const jsonRpcMethods: JsonRpcMethodsType = {
  [JsonRpcMethodMnemocode.VocabularyDirectoryCreateDefault]: vocabularyDirectoryCreateDefault,
  [JsonRpcMethodMnemocode.VocabularyDirectoryListDefault]: vocabularyDirectoryListDefault,
  [JsonRpcMethodMnemocode.VocabularyDirectoryReadDefault]: vocabularyDirectoryReadDefault,
  [JsonRpcMethodMnemocode.VocabularyDirectoryUpdateDefault]: vocabularyDirectoryUpdateDefault,

  [JsonRpcMethodMnemocode.VocabularyDirectoryValueCreateDefault]: vocabularyDirectoryValueCreateDefault,
  [JsonRpcMethodMnemocode.VocabularyDirectoryValueListDefault]: vocabularyDirectoryValueListDefault,
  [JsonRpcMethodMnemocode.VocabularyDirectoryValueReadDefault]: vocabularyDirectoryValueReadDefault,
  [JsonRpcMethodMnemocode.VocabularyDirectoryValueUpdateDefault]: vocabularyDirectoryValueUpdateDefault,

  [JsonRpcMethodMnemocode.VocabularyEntityCreateDefault]: vocabularyEntityCreateDefault,
  [JsonRpcMethodMnemocode.VocabularyEntityListDefault]: vocabularyEntityListDefault,
  [JsonRpcMethodMnemocode.VocabularyEntityReadDefault]: vocabularyEntityReadDefault,
  [JsonRpcMethodMnemocode.VocabularyEntityUpdateDefault]: vocabularyEntityUpdateDefault,

  [JsonRpcMethodMnemocode.VocabularyEntityRecordCreateDefault]: vocabularyEntityRecordCreateDefault,
  [JsonRpcMethodMnemocode.VocabularyEntityRecordListDefault]: vocabularyEntityRecordListDefault,
  [JsonRpcMethodMnemocode.VocabularyEntityRecordReadDefault]: vocabularyEntityRecordReadDefault,
  [JsonRpcMethodMnemocode.VocabularyEntityRecordUpdateDefault]: vocabularyEntityRecordUpdateDefault,

  [JsonRpcMethodMnemocode.VocabularyFieldCreateDefault]: vocabularyFieldCreateDefault,
  [JsonRpcMethodMnemocode.VocabularyFieldListDefault]: vocabularyFieldListDefault,
  [JsonRpcMethodMnemocode.VocabularyFieldReadDefault]: vocabularyFieldReadDefault,
  [JsonRpcMethodMnemocode.VocabularyFieldUpdateDefault]: vocabularyFieldUpdateDefault,
};
