# Features para entrar na master

## Inicie o container do moogoDB

1. O primeiro passo será baixar a imagem do mongoDB. Trabalhamos com a tutum/mongod, mas você pode utilizar uma outra imagem mongo que todos os exemplos irão funcionar normalmente.
```
docker pull tutum/mongodb
```

2. Com a imagem tutum/mongodb no seu host, o próximo passo será criar um contêiner de servidor de banco de dados mongoDB. Para isso, você pode escolher uma das duas instruções abaixo:

Sem senha "recomendado para ambiente de desenvolvimento"
```
docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb
```

Com senha:
```
docker run -d -p 27017:27017 -p 28017:28017 -e MONGODB_PASS="mypass" tutum/mongodb
```

Para verificar se o seu contêiner está executando corretamente, digite o comando ```docker ps```


## Rodar o arquivo tsconfig - para rodar nossa config e criar o diretorio dist resultante da transpiler ts para js:

```
npm run compile
```

Iniciar nosso projeto -  rodar após o comando ```npm run compile```
```
npm start
```

pagina de apoio
```
https://onedrive.live.com/view.aspx?resid=D39698A7F255D88E%211140&id=documents&wd=target%283-projeto%20pratico%20-%20criacao%20da%20API.one%7C6ED1529F-7F95-CE44-8ECF-1E83BF7A4A68%2F17.%20Criando%20a%20primeira%20rota%7CD0E2DB42-D1E3-0945-8E28-70FB447BAFF0%2F%29
onenote:https://d.docs.live.net/d39698a7f255d88e/Documentos/24-criando%20API's%20RESTful%20utilizando%20TypeScript-node-mongo/3-projeto%20pratico%20-%20criacao%20da%20API.one#17.%20Criando%20a%20primeira%20rota&section-id={6ED1529F-7F95-CE44-8ECF-1E83BF7A4A68}&page-id={D0E2DB42-D1E3-0945-8E28-70FB447BAFF0}&end
```
