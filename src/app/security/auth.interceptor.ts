import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable, Injector} from "@angular/core";
import {LoginService} from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector){}

    /* primeiro parâmetro, request que vai ser modificado
        segundo parâmetro, o objeto next representa o próximo interceptor na fila de interceptors
        ou o último objeto, que será o responsável por fazer a chamada final (a requisição)
        quando o interceptor terminar de fazer seu trabalho, precisa interagir com esse objeto para informar o
        Angular que terminou e pode passar a chamada para o resto da fila*/
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const loginService = this.injector.get(LoginService)

        if (loginService.isLoggedIn()) {
            /* Como o objeto HttpRequest é imutável, é preciso fazer um clone do objeto para uma outra instância */
            const authRequest = request.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}})
            return next.handle(authRequest)
        } else {
            return next.handle(request)
        }
    }

}


