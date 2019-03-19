// Import "Request" e "Response" para facilitar a tipagem
import {Request, Response} from 'express'
import {User,  users} from "./users";

import * as jwt from 'jsonwebtoken'
import {apiConfig} from "./api-config";


// Processar o 'post' que foi feito para o login
export const handleAuthentication = (req: Request, resp: Response) => {

    // pegar o objeto que vem no corpo (com email e password)
    const user: User = req.body

    if(isValid(user)){
        const dbUser = users[user.email]

        //primeiro parametro é o token (o que quer dentro do corpo), as "claims"
        //segundo parametro é o password, necessário para assinar o token (criando a terceira parte)
            // aqui será usado uma estratégia de não compartilhar o password com o client (não vai precisar ler o token p pegar os dados),
            // uma segurança a mais, pois não vai conseguir criar um token assinado, utilizando este password
            // a aplicação angular vai precisar apenas, mandar o token de volta, sem precisar colocar nenhuma
            // informação dentro do token, que ela precise gerar um token assinado para poder verificar aqui
        const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret)

        resp.json({name: dbUser.name, email: dbUser.email, accesToken: token})
    }else{
        // Negar acesso
        resp.status(403).json({message: 'Dados inválidos.'})
    }

}

function isValid(user: User): boolean {
    if (!user){
        return false
    }

    const dbUser = users[user.email]
    return dbUser !== undefined && dbUser.matches(user)
}