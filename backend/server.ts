import * as jsonServer from 'json-server'

// Importar o "Express", que é o tipo que representa uma aplicação "Express", p facilitar na tipação, fazer autocomplete...
import { Express } from 'express'

// Módulo que é capaz de ler os arquivos no disco (utilizar certificado e a chave)
import * as fs from 'fs'
import * as https from 'https'

import { handleAuthentication } from "./auth";
import { handleAuthorization } from "./authz";


// Tipar constante "server" com objeto "express", assim fica possível fazer autocomplete dos métodos disponíveis em uma
// aplicação express e tratar melhor os erros
const server: Express = jsonServer.create()

const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

/* Set default middlewares:
 * logger(o que tá chegando no request (metodo, url...)), 
 * static(servir conteudo estático), 
 * cors(pela especificação do cors, o backend tem que liberar o frontend, e essa middleware faz isso) 
 * and no-cache(tudo que o jsonserver retorna, vai com um headers especifico, dizendo p o browser nao fazer cache))
*/
//pode passar também um array de callbacks para o use
server.use(middlewares)

// Add custom routes before JSON Server router
//server.get('/echo', (req, res) => {
//    res.jsonp(req.query)
//})

//configura logo para todos os métodos do HTTP (não apenas para o get, por exemplo)
//server.use('/echo', (req, res) => {
//    res.jsonp(req.query)
//})

//se remover a rota, ascsociamos aquela callback, com TODOS os requests (INDEPENDENTE DA URL CHAMADA)
// Middleware, que (não é obrigada a dar uma resposta, e) pode "passar para o próximo da fila"
// por padrao o Express nao faz o parser do body, o bodyParser tranforma o body em um objeto json e associa no request
// as callbacks que foram configuradas dps do bodyparser, tem a chance de obter o objeto que foi associado no body
// as que foram declaradas antes, não vão ter acesso a esse objeto
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// vamos criar as middlwares depois do bodyparser (login vai ler os dados passados pelo frontend) 
// e antes das callbacks padrões do jsonserver (se for autorizar alguém, por exemplo)
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

// todas as middlewares que estão sendo declaradas antes do router, tem a chance de inspecionar o request e
// dar uma resposta ou chamar o next

// router foi criado encima do backend, 
server.use(router)


const options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
    console.log('JSON Server is running on https://localhost:3001')
})