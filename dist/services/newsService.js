"use strict";
//criar todas nossas querys aqui
Object.defineProperty(exports, "__esModule", { value: true });
const newsRepository_1 = require("../repository/newsRepository");
class NewsService {
    // os principais verbos http de uma api RESTful
    //todos registros da tabela
    get() {
        return newsRepository_1.default.find({});
    }
    getbyId(_id) {
        return newsRepository_1.default.findById(_id);
    }
    create(news) {
        return newsRepository_1.default.create(news);
    }
    // procura por id para atualizar
    update(_id, news) {
        return newsRepository_1.default.findByIdAndUpdate(_id, news);
    }
    // procura por id para apagar
    delete(_id) {
        return newsRepository_1.default.findByIdAndDelete(_id);
    }
}
//exportamos para  pegar na nossa controle
exports.default = new NewsService();
