"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
//clase de conexao com db
class Database {
    constructor() {
        //private DB_URL = "mongodb://localhost:27017/db_portal" 
        this.DB_URL = "mongodb://link-db/db_portal";
    }
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose.connect(this.DB_URL);
            }
            catch (error) {
                console.error(`# Erro ao conectar com banco de dados mongoDB: \n ${error}`);
            }
        });
    }
}
exports.default = Database;
