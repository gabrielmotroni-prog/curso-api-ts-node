import * as mongoose from "mongoose";

//clase de conexao com db
class Database {
    //private DB_URL = "mongodb://localhost:27017/db_portal" 
    private DB_URL = "mongodb://link-db/db_portal" 

    async createConnection(){
        try{
            await mongoose.connect(this.DB_URL)
        }catch(error){
            console.error(`# Erro ao conectar com banco de dados mongoDB: \n ${error}`)
        }
    }
}

export default Database;
