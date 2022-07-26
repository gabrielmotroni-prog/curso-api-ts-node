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
// classe que servirá como middler para interceptar nossas rotas para verificar nossso toen de autenticacao
const jwt = require("jsonwebtoken");
const configs_1 = require("./configs");
class Auth {
    // expor via endpoint  
    generateToken(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email } = userData;
            const token = yield jwt.sign({
                id,
                email,
            }, configs_1.default.secret, {
                expiresIn: "1hr",
            });
            return token;
        });
    }
    //metodo - como eh um middle aceita objs de req, res e next
    validate(req, res, next) {
        let token = req.headers["x-access-token"]; //padrao definino por nos  que vem pelo header
        if (token) {
            //caso tenha token, valida o token
            jwt.verify(token, configs_1.default.secret, function (err, decoded) {
                if (err) {
                    //token invalido
                    return res.status(403).send({
                        success: false,
                        message: "403 - Token Inválido",
                    });
                }
                else {
                    next(); //usuario pode processeguir
                }
            });
        }
        else {
            return res.status(401).send({
                success: false,
                message: "401 - unauthorized",
            });
        }
    }
}
exports.default = new Auth();
