import * as mongoose from 'mongoose'
import NewsSchema from '../models/newsSchema'

//mapear a collection a ser criada no banco com a model
//Serve para mapear nossa model com a collection no db
export default mongoose.model("news", NewsSchema)