"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
// Processar o 'post' que foi feito para o login
exports.handleAuthentication = function (req, resp) {
    // pegar o objeto que vem no corpo (com email e password)
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        //primeiro parametro é o token (o que quer dentro do corpo), as "claims"
        //segundo parametro é o password, necessário para assinar o token (criando a terceira parte)
        // aqui será usado uma estratégia de não compartilhar o password com o client (não vai precisar ler o token p pegar os dados),
        // uma segurança a mais, pois não vai conseguir criar um token assinado, utilizando este password
        // a aplicação angular vai precisar apenas, mandar o token de volta, sem precisar colocar nenhuma
        // informação dentro do token, que ela precise gerar um token assinado para poder verificar aqui
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        // Negar acesso
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
