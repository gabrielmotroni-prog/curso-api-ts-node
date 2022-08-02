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
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const redis = require("redis");
const helper_1 = require("../infra/helper");
class NewsController {
    //mesmo que os verbos http feios em news Service
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield redis.createClient({ url: 'redis://redis:6379' });
                yield client.connect();
                const newsRedis = yield client.get("news");
                //consulta se existe valor no redis
                if (newsRedis) {
                    console.log("redis");
                    helper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(newsRedis));
                }
                else {
                    //consulta banco
                    const newsDB = yield newsService_1.default.get();
                    //guarda em cache no redis
                    client.set("news", JSON.stringify(newsDB));
                    client.expire("news", 20);
                    console.log("DB");
                    helper_1.default.sendResponse(res, HttpStatus.OK, newsDB);
                }
                ;
            }
            catch (error) {
                console.error(`# Erro ao tentar consultar \n ${error}`);
                return false;
            }
        });
    }
    getbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                let response = yield newsService_1.default.getbyId(_id);
                helper_1.default.sendResponse(res, HttpStatus.OK, response);
            }
            catch (error) {
                console.error(`# Erro ao tentar consultar \n ${error}`);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //corpo recebdido
                let vm = req.body;
                const response = yield newsService_1.default.create(vm);
                helper_1.default.sendResponse(res, HttpStatus.OK, { mensage: 'Noticia cadastrada com sucesso!', data: response });
            }
            catch (error) {
                console.error(`# Erro ao tentar criar \n ${error}`);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                //corpo recebdido
                let news = req.body;
                yield newsService_1.default.update(_id, news);
                helper_1.default.sendResponse(res, HttpStatus.OK, `${news.title} Noticia alterada com sucesso!`);
            }
            catch (error) {
                console.error(`# Erro ao tentar atualizar \n ${error}`);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                yield newsService_1.default.delete(_id);
                helper_1.default.sendResponse(res, HttpStatus.OK, `Noticia deletada com sucesso!`);
            }
            catch (error) {
                console.error(`# Erro ao tentar deletar \n ${error}`);
            }
        });
    }
}
exports.default = new NewsController();
