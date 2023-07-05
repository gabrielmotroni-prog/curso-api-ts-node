//criar todas nossas querys aqui

import newsRepository from "../repository/newsRepository";

class NewsService {
  // os principais verbos http de uma api RESTful

  async search(term, page, perrPage) {
    //expressa regular: comece e termine com term, 'i' eh para case sensitive true- procura em minúsculo ou maiúsculo
    const result = await newsRepository
      .find({ title: new RegExp(".*" + term + ".*", "i") }, "title text hat")
      .skip(page) // numero de paginas-itens para pular
      .limit(perrPage * 1); //limite itens por pagina

    // contagem dos itens retornados da consulta
    const count = await result.length;
    // obter total de documentos da colecao
    const countDocuments = await newsRepository.countDocuments();

    // return response with posts, total pages, and current page
    result.push({
      totalResults: count, // total resultado de dados filtrados
      totalDocuments: countDocuments, //total de documentos da colecao
      totalPages: Math.ceil(countDocuments / perrPage), // total / limit
      currentpage: page,
    });

    return result;
  }
  //todos registros da tabela
  async get(startDate?, endDate?) {
    if (startDate && endDate) {
      let objConsultaDate = {};

      //verifica consulta de data do mesmo dia, com diferenca apenas de horas e minutos
      startDate.getUTCDate() === endDate.getUTCDate()
        ? (objConsultaDate = {
            active: true,
            publishDate: { $gt: `${startDate}`, $lt: endDate },
          })
        : (objConsultaDate = {
            active: true,
            publishDate: { $gt: startDate, $lt: endDate },
          });

      //realiza consulta de acordo com obj montado
      return await newsRepository
        .find(objConsultaDate, "title text hat img publishDate")
        .sort({ publishDate: -1 }); // -1 tras maior para menor
    } else {
      // caso nao passe query com datas, retorne todos registros
      return await newsRepository
        .find({ active: true }, "title text hat img publishDate")
        .sort({ publishDate: -1 });
    }
  }

  async getbyId(_id) {
    return await newsRepository.findById(_id);
  }
  async create(news) {
    return await newsRepository.create(news);
  }
  // procura por id para atualizar
  async update(_id, news) {
    return await newsRepository.findByIdAndUpdate({ _id: _id }, news); //(_id, news)
    //    "develop": "nodemon ./dist/program.js"
  }
  // procura por id para apagar
  async delete(_id) {
    return await newsRepository.findByIdAndDelete(_id);
  }
}

//exportamos para  pegar na nossa controle
export default new NewsService();
