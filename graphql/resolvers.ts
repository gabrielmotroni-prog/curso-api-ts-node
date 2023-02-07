import NewsService from "../services/newsService";


//mapeamento para que saiba aonde encontrar cada coisa, entre nossa service e o graphQL
const resolvers = {
    newsList: async () =>await NewsService.get(),

    newsGetById: async (args)=>{
        return await NewsService.getbyId(args.id)
    },

    addNews: async (args)=>{
        return await NewsService.create(args.input)
    },

    deleteNews: async (args)=>{
        return await NewsService.delete(args.id)
    },

    updateNews: async (args)=>{ // id e objeto completo
        return await NewsService.update(args.input._id, args.id)
    },
    
    //search : licao de casa - aula 126
}

export default resolvers;