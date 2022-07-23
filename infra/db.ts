import * as mongoose from "mongoose";

//clase de conexao com db
class Database {
    private DB_URL = "mongodb://link-db/db_portal" // link-db : link presente no docker-compose. Sobe container nas portas especificadas

    createConnection(){
        mongoose.connect(this.DB_URL)
    }
}

export default Database;
