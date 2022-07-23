"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
//clase de conexao com db
class Database {
    constructor() {
        this.DB_URL = "mongodb://link-db:27017/db_portal"; // vamos apontar para db do docker
    }
    createConnection() {
        mongoose.connect(this.DB_URL);
    }
}
exports.default = Database;
