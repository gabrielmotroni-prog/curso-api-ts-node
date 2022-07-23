//classe startUp passamos ao program.ts
import * as express from "express"; // para as rotas
import * as bodyParse from "body-parser" /// ajudar com os middles - json e qeur string

import Database from "./infra/db"; //conexao com base dados
import NewsControlers from "./controller/newsControlers"; //controle para chamar na rota

class StartUp {
    //atributo publico do tipo express.Application
    public app: express.Application;
    //atributo privado tipo db
    private _db: Database;
    //atrbuto bodyParse
    private bodyParse;

    constructor(){
        //instacia
        this._db = new Database();
        this.app = express();

        //incia - importante estar antes de rotas
        this.middler();
        //inicia as rotass
        this.routes();

        // cria coenxao
        this._db.createConnection();
    }
    middler(){
        this.app.use(bodyParse.json()); //trabalahr com json
        this.app.use(bodyParse.urlencoded({extended:false})); // para trabalharmos com query string
    }

    //metodo
    routes(){
        //rota padrao
        this.app.route('/').get((req,res)=>{
            res.send({versao:'0.0.1'})
        });

        // rotas referente a news
        this.app.route("/api/v1/news").get(NewsControlers.get);
        this.app.route("/api/v1/news/:id").get(NewsControlers.getbyId);
        this.app.route("/api/v1/news").post(NewsControlers.create);
        this.app.route("/api/v1/news/:id").put(NewsControlers.update);
        this.app.route("/api/v1/news/:id").delete(NewsControlers.delete);


    }


}

//exporta para ser capturada em program.ts
export default new StartUp();