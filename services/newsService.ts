//criar todas nossas querys aqui

import newsRepository from "../repository/newsRepository";

class NewsService {
    
    // os principais verbos http de uma api RESTful

    //todos registros da tabela
    get(){
        return newsRepository.find({})
    }

    getbyId(_id){
            return newsRepository.findById(_id)
    }
    create(news){
        return newsRepository.create(news)
    }
    // procura por id para atualizar
    update(_id, news){
        return newsRepository.findByIdAndUpdate(_id, news)
    }
    // procura por id para apagar
    delete(_id){
        return newsRepository.findByIdAndDelete(_id)
    }

}

//exportamos para  pegar na nossa controle
export default new NewsService();