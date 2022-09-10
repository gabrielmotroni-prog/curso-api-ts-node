import * as mongoose from "mongoose"
import * as moment from "moment"

const newsSchema = new mongoose.Schema({
    hat: { type: String }, 
    title: { type: String }, 
    text: { type: String }, 
    author: { type: String }, 
    publishDate: { type: Date, default:  moment().format('YYYY-MM-DD hh:mm:ss')}, //caso nao informa, pega data e hora do sistema
    link: { type: String }, 
    active: { type: Boolean }, 
    tag: { type: String }, 
    img: { type: String }, 
})

export default newsSchema