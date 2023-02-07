export default

//Query: faz list
//Mutation: faz alteracao

`
scalar Date 

type Query{
    newslist:[News]
    newsGetById(id: String): News
}
type Mutation {
    addNews(input: NewsInput): News
    updateNews(id: String, input:NewsInput): News
    deleteNews(id: String): News
}
type News{
    _id: String,
    hat: String,
    title: String,
    text:String,
    author: String,
    img: String,
    publishDate: Date,
    link: String,
    tag: String,
    active: Boolean
}

type NewsInput{
    _id: String,
    hat: String,
    title: String,
    text:String,
    author: String,
    img: String,
    publishDate: Date,
    link: String,
    tag: String,
    active: Boolean
}
`

/*
query

mutation

ambos criam metodos que trabalhar com
resolver + os types

*/