import * as express from "express";

class StartUp {
    //atributo publico do tipo express.Application
    public app: express.Application;

    constructor(){
        this.app = express();
        //inicia as rotass
        this.routes();
    }

    //metodo
    routes(){
        this.app.route('/').get((req,res)=>{
            res.send({versao:'0.0.1'})
        })
    }

}

//exporta para ser capturada em program.ts
export default new StartUp();