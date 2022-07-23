import StartUp from "./startUp";

//pega porta liberada no ngix ou IS
let port = process.env.PORT || '3050'

//seta a porta ao app e pede para me dizer qual porta esta rodando
StartUp.app.listen(port, function(){
    console.log(`servidor executand na porta ${port}`)
})