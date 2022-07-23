import * as mongoose from "mongoose";

//clase de conexao com db
class Database {
    private DB_URL = "mongodb://link-db:27017/db_portal" // vamos apontar para db do docker

    createConnection(){
        mongoose.connect(this.DB_URL)
    }
}

export default Database;
