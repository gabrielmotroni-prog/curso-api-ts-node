//criar todas nossas querys aqui

import newsRepository from "../repository/newsRepository";

class NewsService {
    
    // os principais verbos http de uma api RESTful

    //todos registros da tabela
    async get(){
        return await newsRepository.find({})
    }

    async getbyId(_id){
            return await newsRepository.findById(_id)
    }
    async create(news){
        return await newsRepository.create(news)
    }
    // procura por id para atualizar
    async update(_id, news){
        return await newsRepository.updateOne({id: _id}, news) //(_id, news)
    }
    // procura por id para apagar
    async delete(_id){
        return await newsRepository.findByIdAndDelete(_id)
    }

}

//exportamos para  pegar na nossa controle
export default new NewsService();