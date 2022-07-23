"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//classe startUp passamos ao program.ts
const express = require("express"); // para as rotas
const bodyParse = require("body-parser"); /// ajudar com os middles - json e qeur string
const db_1 = require("./infra/db"); //conexao com base dados
const newsControlers_1 = require("./controller/newsControlers"); //controle para chamar na rota
class StartUp {
    constructor() {
        //instacia
        this._db = new db_1.default();
        this.app = express();
        //incia - importante estar antes de rotas
        this.middler();
        //inicia as rotass
        this.routes();
        // cria coenxao
        this._db.createConnection();
    }
    middler() {
        this.app.use(bodyParse.json()); //trabalahr com json
        this.app.use(bodyParse.urlencoded({ extended: false })); // para trabalharmos com query string
    }
    //metodo
    routes() {
        //rota padrao
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' });
        });
        // rotas referente a news
        this.app.route("/api/v1/news").get(newsControlers_1.default.get);
        this.app.route("/api/v1/news/:id").get(newsControlers_1.default.getbyId);
        this.app.route("/api/v1/news").post(newsControlers_1.default.create);
        this.app.route("/api/v1/news/:id").put(newsControlers_1.default.update);
        this.app.route("/api/v1/news/:id").delete(newsControlers_1.default.delete);
    }
}
//exporta para ser capturada em program.ts
exports.default = new StartUp();
