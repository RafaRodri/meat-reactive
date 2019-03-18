import {HttpErrorResponse} from '@angular/common/http'
import {Observable} from "rxjs/Observable";
//import 'rxjs/add/observable/throw'

export class ErrorHandler{
    static handleError(error: HttpErrorResponse | any){
        let errorMessage: string

        //se error for instância de resposta
        if(error instanceof HttpErrorResponse){
            const body = error.error
            errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${body}`
        }
        //como ñ sabemos quem é o objeto, apenas atribuir a toString do erro a propriedade
        else{
            errorMessage = error.message ? error.message : error.toString()
        }

        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}