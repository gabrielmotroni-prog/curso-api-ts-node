/*
 responsável por passar nosso type mapeado com nosssas model para o graphQL
*/
import { buildSchema, GraphQLSchema } from "graphQL";

import newsType from "./types/newsType";

//coloquei : any no schema pq estava dando algum erro ao cham-lo no startUp.ts
// passamos todos nossos schemas mapeados para `schema`
const schema = buildSchema(newsType);

export default schema;
