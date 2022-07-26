//classe startUp passamos ao program.ts
import * as express from "express"; // para as rotas
import * as bodyParse from "body-parser"; /// ajudar com os middles - json e qeur string
import * as cors from "cors";

import Database from "./infra/db"; //conexao com base dados
import NewsControlers from "./controller/newsControlers"; //controle para chamar na rota
import Auth from "./infra/auth"; //validador de toker jwt
import uploads from "./infra/upload";

class StartUp {
  //atributo publico do tipo express.Application
  public app: express.Application;
  //atributo privado tipo db
  private _db: Database;
  //atrbuto bodyParse
  private bodyParse;

  constructor() {
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

  //habita cors na nossa aplicacao
  //metodo com as config de aceite
  enableCors() {
    //objeto do tipo CorsOptions
    const options: cors.CorsOptions = {
      methods: "GET, OPTIONS, PUT, POST, DELETE",
      origin: "*",
    };

    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParse.json()); //trabalahr com json
    this.app.use(bodyParse.urlencoded({ extended: false })); // para trabalharmos com query string
  }

  //metodo
  routes() {
    //rota padrao
    this.app.route("/").get((req, res) => {
      res.send({ versao: "0.0.1" });
    });

    //rota upload de arquivos
    this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
      //single - um arquivo
      try {
        res.send('Arquivo enviado com sucessso!');
      } catch (error) {
        console.log(error)
      }
    });

    //bloqueia rotas abaixo, validando jwt
    this.app.use(Auth.validate);

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
