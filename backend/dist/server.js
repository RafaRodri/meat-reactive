"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
// Módulo que é capaz de ler os arquivos no disco (utilizar certificado e a chave)
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
// Tipar constante "server" com objeto "express", assim fica possível fazer autocomplete dos métodos disponíveis em uma
// aplicação express e tratar melhor os erros
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);
// middleware para login
server.post('/login', auth_1.handleAuthentication);
server.use(router);
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
