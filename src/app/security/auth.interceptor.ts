import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable, Injector} from "@angular/core";
import {LoginService} from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector){}

    /* primeiro parâmetro, request que vai ser modificado
        segundo parâmetro, o objeto next representa o próximo interceptor na fila de interceptors
        ou o último objeto, que será o responsável por fazer a chamada final (a requisição)*/
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /* se ocorrer erro reclamando de uma dependência cíclica com o token usado (LoginService), 
         * trocamos o ponto onde obtemos a referência ao LoginService
         *
         * Injector é uma referência para o mecanismo de injeção de dependência do Angular,
         * através dele é possível obter qualquer objeto que esteja registrado dentro do container de injeção
         * de dependência (como "NotificationService", "LoginService"). 
         * 
         * Ele tem um método "get" e é preciso informar o tipo desejado, 
         * para que ele devolva a instância e suas dependências
         */
        const loginService = this.injector.get(LoginService)

        if (loginService.isLoggedIn()) {
            /* Como o objeto HttpRequest é imutável, é preciso fazer um clone do objeto para uma outra instância */
            const authRequest = request.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}})
            
            /* quando o interceptor terminar de fazer seu trabalho, precisa interagir com esse objeto para informar o
             * Angular que terminou e pode passar a chamada para o resto da fila
             */
            return next.handle(authRequest)
        } else {
            return next.handle(request)
        }
    }

}


