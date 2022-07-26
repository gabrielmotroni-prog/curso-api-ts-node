// classe que servirá como middler para interceptar nossas rotas para verificar nossso toen de autenticacao
import * as jwt from "jsonwebtoken";
import Configs from "./configs";

class Auth {

  // expor via endpoint  
  async generateToken(userData) {
    const { id, email } = userData;
    const token = await jwt.sign(
      {
        id,
        email,
      },
      Configs.secret,
      {
        expiresIn: "1hr",
      }
    );

    return token;
  }

  //metodo - como eh um middle aceita objs de req, res e next
  validate(req, res, next) {
    let token = req.headers["x-access-token"]; //padrao definino por nos  que vem pelo header

    if (token) {
      //caso tenha token, valida o token
      jwt.verify(token, Configs.secret, function (err, decoded) {
        if (err) {
          //token invalido
          return res.status(403).send({
            success: false,
            message: "403 - Token Inválido",
          });
        } else {
          next(); //usuario pode processeguir
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "401 - unauthorized",
      });
    }
  }
}

export default new Auth();
