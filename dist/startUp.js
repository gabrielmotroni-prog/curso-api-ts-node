"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class StartUp {
    constructor() {
        this.app = express();
        //inicia as rotass
        this.routes();
    }
    //metodo
    routes() {
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' });
        });
    }
}
//exporta para ser capturada em program.ts
exports.default = new StartUp();
