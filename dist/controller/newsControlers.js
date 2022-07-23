"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const helper_1 = require("../infra/helper");
class NewsController {
    //mesmo que os verbos http feios em news Service
    get(req, res) {
        newsService_1.default.get()
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    getbyId(req, res) {
        const _id = req.params.id;
        newsService_1.default.getbyId(_id)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    create(req, res) {
        //corpo recebdido
        let vm = req.body;
        newsService_1.default.create(vm)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, 'Noticia cadastrada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    update(req, res) {
        const _id = req.params.id;
        //corpo recebdido
        let news = req.body;
        newsService_1.default.update(_id, news)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, ` ${news.title} Noticia alterada com sucesso!`))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        newsService_1.default.delete(_id)
            .then(() => helper_1.default.sendResponse(res, HttpStatus.OK, `Noticia deletada com sucesso!`))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}
exports.default = new NewsController();
