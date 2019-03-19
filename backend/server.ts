import * as jsonServer from 'json-server'

// Importar o "Express", que é o tipo que representa uma aplicação "Express", p facilitar na tipação, fazer autocomplete...
import {Express} from 'express'

// Módulo que é capaz de ler os arquivos no disco (utilizar certificado e a chave)
import * as fs from 'fs'
import * as https from 'https'

import {handleAuthentication} from "./auth";
import {handleAuthorization} from "./authz";


// Tipar constante "server" com objeto "express", assim fica possível fazer autocomplete dos métodos disponíveis em uma
// aplicação express e tratar melhor os erros
const server: Express = jsonServer.create()

const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()


server.use(middlewares)

server.use(jsonServer.bodyParser)

// middleware para login
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

server.use(router)


const options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
    console.log('JSON Server is running on https://localhost:3001')
})