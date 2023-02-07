/*
 responsável por passar nosso type mapeado com nosssas model para o graphQL
*/
import { buildSchema} from "graphQL"
import newsType from "./types/newsType"

// passamos todos nossos schemas mapeados para `schema`
const schema = buildSchema(
    newsType 
)

export default schema