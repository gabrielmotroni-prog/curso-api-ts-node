"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// classe que servirá como middler para interceptar nossas rotas para verificar nossso toen de autenticacao
const jwt = require("jsonwebtoken");
const configs_1 = require("./configs");
class Auth {
    //metodo - como eh um middle aceita objs de req, res e next
    validate(req, res, next) {
        let token = req.headers['x-access-token']; //padrao definino por nos  que vem pelo header
        if (token) {
            //caso tenha token, valida o token
            jwt.verify(token, configs_1.default.secret, function (err, decoded) {
                if (err) { //token invalido
                    return res.status(403).send({
                        success: false,
                        message: '403 - Token Inválido'
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
                message: '401 - unauthorized'
            });
        }
    }
}
exports.default = new Auth;
