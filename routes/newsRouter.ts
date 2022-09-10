import * as express from 'express';
import NewsControlers from "../controller/newsControlers"; //controle para chamar na rota

const newsRouter = express.Router();

// rotas referente a news
newsRouter.route("/api/v1/news").get(NewsControlers.get);
newsRouter.route("/api/v1/news/:id").get(NewsControlers.getbyId);
newsRouter.route("/api/v1/news/search/:term").get(NewsControlers.search);
newsRouter.route("/api/v1/news").post(NewsControlers.create);
newsRouter.route("/api/v1/news/:id").put(NewsControlers.update);
newsRouter.route("/api/v1/news/:id").delete(NewsControlers.delete);


export default newsRouter
