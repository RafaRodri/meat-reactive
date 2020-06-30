// Serão injetados serviços
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {NavigationEnd, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {MEAT_API} from "../../app.api";
import {User} from "./user.model";
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'

@Injectable()
export class LoginService {

    user: User
    lastUrl: string

    constructor(private http: HttpClient, private router: Router){
        this.router.events  // OBSERVABLE do router que fica NOTIFICANDO sobre as mudanças (urls) de navegação do usuário
                            // (atual, que acabou de ativar, anterior e assim por diante)
                        .filter(e => e instanceof NavigationEnd)    // filtrar para pegar apenas a última rota
                        .subscribe((e: NavigationEnd) => 
                            this.lastUrl = e.url    // mandar a url atual (filtrada acima) quando alguém chamar o "handlerLogin()" e não passar
                                                    // nenhuma url, para assim retornar para a página navegada antes de ir para a tela de login
                        )
    }

    isLoggedIn(): boolean{
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User> {
         return this.http.post<User>(`${MEAT_API}/login`,
             {email: email, password: password})
             .do(user => this.user = user)
    }

    logout(){
        this.user = undefined
    }

    handleLogin(path: string = this.lastUrl){
        this.router.navigate(['/login', btoa(path)])
    }
    
}