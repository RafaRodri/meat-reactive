const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
// logger: logar o que está chegando no request (qual método, url, o que está sendo pedido)
// static: para servir conteúdo estático
// cors: adiciona alguns headers, para atender a especificação (como o FE está em um domínio e o BE em outro, e pela
//          especificação do 'cors' o BE tem que liberar o FE, e esta middleware faz isso de forma automática)
// no-cache: informar para o browser não fazer cache do que o json-server está retornando
server.use(middlewares)


// // Método use e get
// // use() vai ser usado para todos os verbos do protocolo HTTP (e não somente para o get)
// //          se a rota for removida, a callback vai ser associada com TODOS os requests, usando o "USE"
// // get() aceita 2 parâmetros: o caminho(url) e a função de callback que será utilizada para dar uma resposta
// server.get('/echo', (req, res) => {
//     res.jsonp(req.query)
// })


// Pega o body e transforma em um objeto json (por padrão o express não faz o parse do body) e associa no request
// Assim, as callbacks que vem depois, podem acessar esse objeto que aqui foi associado
server.use(jsonServer.bodyParser)


// // Middleware, tem um papel um pouco diferente da callback tradicional,
// // ela não é obrigada a dar uma resposta quando executada, podendo chamar a função next() após realizar sua tarefa,
// // basicamente chamando o próximo da fila (na ordem, a próxima chamada ao método "use" da aplicação express)
// server.use((req, res, next) => {
//     if (req.method === 'POST') {
//         req.body.createdAt = Date.now()
//     }
//     // Continue to JSON Server router
//     next()
// })


// Router é criado encima do db.json (que contém urls e dados da aplicação), sendo assim, todas as "middlewares"
// que estão sendo declaradas antes do "router", tem a chance de inspecionar o request, dar uma resposta) ou chamar o next()
// e aí o request vai passando na cadeia até chegar no "router"
server.use(router)


// Agora dizemos ao Express.js para escutar na porta 3000
// A função app.listen() aceita como segundo parâmetro uma função de callback
server.listen(3000, () => {
    console.log('JSON Server is running')
})