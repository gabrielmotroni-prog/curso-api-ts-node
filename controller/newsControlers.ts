import newsService from "../services/newsService";
import * as HttpStatus from "http-status"
import * as redis from "redis"
import Helper from "../infra/helper";
import * as moment from "moment"

class NewsController {

    //mesmo que os verbos http feios em news Service
    async get(req, res){

        try{
            //compose 
            //const client = await redis.createClient({url:'redis://redis:6379'});
            const client = await redis.createClient();
            await client.connect();
            const newsRedis = await client.get("news");

            let startDate = req.query.startDate ? new Date(req.query.startDate) :
               null;
            let endDate = req.query.endDate ? new Date(req.query.endDate) : 
               null;
            
            //consulta se existe valor no redis
            if(newsRedis){
                console.log("redis");
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(newsRedis));
                
            }else{
                //consulta banco
                const newsDB = await newsService.get(startDate,endDate);
                //guarda em cache no redis
                client.set("news", JSON.stringify(newsDB));
                client.expire("news",3)
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
    async search(req, res){

        try{
            const term = req.params.term
            const page = req.query.page ? parseInt(req.query.page) : 1 //default 1 pagina
            const perrPage = req.query.limit ? parseInt(req.query.limit) : 10 //default 10 itens por pagina
            
            let response = await newsService.search(term, page, perrPage)
            
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