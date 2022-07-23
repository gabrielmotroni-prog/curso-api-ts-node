class Helper {
    
    //metodo generico para ser utilizado em todas rotas
    //data -> valor esperado
    sendResponse = function(res, statusCode, data){
        res.status(statusCode).json({result: data})
    }
}

export default new Helper();