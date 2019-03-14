import { Response } from '@angular/http'
import { Observable } from "rxjs/Observable";
//import 'rxjs/add/observable/throw'

export class ErrorHandler{
    static handleError(error: Response | any){
        let errorMessage: string

        //se error for instância de resposta
        if(error instanceof Response){
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`
        }
        //como ñ sabemos quem é o objeto, apenas atribuir a toString do erro a propriedade
        else{
            errorMessage = error.toString()
        }

        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}