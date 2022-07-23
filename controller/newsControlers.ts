import newsService from "../services/newsService";
import * as HttpStatus from "http-status"
import Helper from "../infra/helper";

class NewsController {

    //mesmo que os verbos http feios em news Service
    get(req, res){
        newsService.get()
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `Error ${error}`))

    }

    getbyId(req, res){

        const _id = req.params.id

        newsService.getbyId(_id)
        .then(news =>Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `Error ${error}`))
    
    }
    create(req, res){
        
        //corpo recebdido
        let vm = req.body;

        newsService.create(vm)
        .then(news =>Helper.sendResponse(res, HttpStatus.OK, 'Noticia cadastrada com sucesso!'))
        .catch(error => console.error.bind(console, `Error ${error}`))
    }

    update(req, res ){

        const _id = req.params.id
        //corpo recebdido
        let news = req.body;

        newsService.update(_id, news)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, ` ${news.title} Noticia alterada com sucesso!`))
        .catch(error => console.error.bind(console, `Error ${error}`))
    }

    delete(req, res){
        const _id = req.params.id

        newsService.delete(_id)
        .then( ()=> Helper.sendResponse(res, HttpStatus.OK, `Noticia deletada com sucesso!`))
        .catch(error => console.error.bind(console, `Error ${error}`))

    }
}

export default new NewsController();