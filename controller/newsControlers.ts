import newsService from "../services/newsService";
import * as HttpStatus from "http-status"
import * as redis from "redis"
import Helper from "../infra/helper";

class NewsController {

    //mesmo que os verbos http feios em news Service
    async get(req, res){

        try{
            const client = await redis.createClient({url:'redis://redis:6379'});
            await client.connect();
            const newsRedis = await client.get("news");
            
            //consulta se existe valor no redis
            if(newsRedis){
                console.log("redis");
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(newsRedis));
                
            }else{
                //consulta banco
                const newsDB = await newsService.get();
                //guarda em cache no redis
                client.set("news", JSON.stringify(newsDB));
                client.expire("news",20)
                console.log("DB")
                Helper.sendResponse(res, HttpStatus.OK, newsDB);
            };
        }catch(error){
            console.error(`# Erro ao tentar consultar \n ${error}`)
            return false
        }
    }

    async getbyId(req, res){

        try{
            const _id = req.params.id
            let response = await newsService.getbyId(_id)
            
            Helper.sendResponse(res, HttpStatus.OK, response)
        }catch(error){
            console.error(`# Erro ao tentar consultar \n ${error}`)
        } 
    }
    async create(req, res){

        try{
            //corpo recebdido
            let vm = req.body;

            const response = await newsService.create(vm);
            Helper.sendResponse(res, HttpStatus.OK, {mensage: 'Noticia cadastrada com sucesso!', data: response})
        } catch(error){
            console.error(`# Erro ao tentar criar \n ${error}`)
        }
    }

    async update(req, res ){
        try{
            const _id = req.params.id
            //corpo recebdido
            let news = req.body;

            await newsService.update(_id, news)
            Helper.sendResponse(res, HttpStatus.OK, `${news.title} Noticia alterada com sucesso!`)

        }catch(error){
            console.error(`# Erro ao tentar atualizar \n ${error}`)
        }
    }

    async delete(req, res){
        try{
            const _id = req.params.id

            await newsService.delete(_id)
            Helper.sendResponse(res, HttpStatus.OK, `Noticia deletada com sucesso!`)        
        }catch(error){
            console.error(`# Erro ao tentar deletar \n ${error}`)
        }
    }
}

export default new NewsController();