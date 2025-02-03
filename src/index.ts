import "module-alias/register";

import { Server, ServerCredentials } from "@grpc/grpc-js";

import { VocabularyService } from "./gen/server/vocabulary";

import { vocabularyServiceMethods } from "@routes";
import mongoose from "mongoose";

const server = new Server();

mongoose.connect(`mongodb://localhost:27017/docforge_db`);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Ошибка подключения к MongoDB:"));
db.once("open", () => {
  console.log("База данных запущена");
});

server.addService(VocabularyService, vocabularyServiceMethods);

const PORT = "0.0.0.0:50051";
server.bindAsync(PORT, ServerCredentials.createInsecure(), () => {
  console.log(`Сервер запущен на ${PORT}`);
});
