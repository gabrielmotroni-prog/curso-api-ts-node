"use strict";
//criar todas nossas querys aqui
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
const newsRepository_1 = require("../repository/newsRepository");
class NewsService {
    // os principais verbos http de uma api RESTful
    //todos registros da tabela
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.find({});
        });
    }
    getbyId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.findById(_id);
        });
    }
    create(news) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.create(news);
        });
    }
    // procura por id para atualizar
    update(_id, news) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.updateOne({ id: _id }, news); //(_id, news)
        });
    }
    // procura por id para apagar
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.findByIdAndDelete(_id);
        });
    }
}
//exportamos para  pegar na nossa controle
exports.default = new NewsService();
