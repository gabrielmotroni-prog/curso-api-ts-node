//classe startUp passamos ao program.ts

//terceiros//
import * as express from "express"; // para as rotas
import * as bodyParse from "body-parser"; /// ajudar com os middles - json e qeur string
import * as cors from "cors";
import * as compression from "compression";
// para passar nosso resouvers,schmes ao graphql
//import  {graphqlHTTP} from 'express-graphql'
//import  {graphql} from 'graphql'
import * as graphqlHTTP from "express-graphql";

//nossos//
import Database from "./infra/db"; //conexao com base dados
import Auth from "./infra/auth"; //validador de toker jwt
import uploads from "./infra/upload";
import newsRouter from "./routes/newsRouter"; //importa as rotas de newsRouter
import newsRepository from "./repository/newsRepository";
// nossos dados do graphql
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";

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
  // nosso metodo middler
  middler() {
    this.enableCors();
    this.app.use(bodyParse.json()); //trabalahr com json
    this.app.use(bodyParse.urlencoded({ extended: false })); // para trabalharmos com query string
    this.app.use(compression()); //deixa nossas api mas perfomatica
  }

  //metodo
  routes() {
    //rota padrao
    this.app.route("/").get((req, res) => {
      const motroni = "d";
      console.log(motroni);
      res.send({ versao: "0.0.1" });
    });

    //rota upload de arquivos
    this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
      //single - um arquivo
      try {
        res.send("Arquivo enviado com sucessso!");
      } catch (error) {
        console.log(error);
      }
    });

    //middle bloqueia rotas abaixo, validando jwt
    //this.app.use(Auth.validate);

    //rotas sobre news
    this.app.use(newsRouter);
    // poderia ser
    //this.app.use('/', newsRouter)

    //rota graphql
    //é preciso configurar o middleware do GraphQL para funcionar com o express.
    this.app.use(
      "/graphql",
      bodyParse.json(),
      graphqlHTTP({
        schema: schemas, // nossos types
        rootValue: resolvers, // nossas services
        graphiql: true, // permita modo debug
      })
    );
  }
}

//exporta para ser capturada em program.ts
export default new StartUp();
