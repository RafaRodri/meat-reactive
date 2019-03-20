import {HttpErrorResponse} from '@angular/common/http'
import {Observable} from "rxjs/Observable";
import {ErrorHandler, Injectable, Injector, NgZone} from "@angular/core";
import {NotificationService} from "./shared/messages/notification.service";
import {LoginService} from "./security/login/login.service";
//import 'rxjs/add/observable/throw'

@Injectable()
export class AplicationErrorHandler extends ErrorHandler{

    constructor(private ns: NotificationService,
                private injector: Injector,
                private zone: NgZone){
        // chamar o construtor padrão da classe ErrorHandler, pois parou de ser chamado
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any){
        if (errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message

            // passar função que execute dentro da zona "monitorada" pelo Angular
            this.zone.run(()=>{
                switch (errorResponse.status){
                    case 401:
                        // mandar para a tela de login
                        this.injector.get(LoginService).handleLogin()
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado.')
                        break;
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado. Verifique console para mais detalhes.')
                        break;
                }
            })
        }
        super.handleError(errorResponse)
    }
}