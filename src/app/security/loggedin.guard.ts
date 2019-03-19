import {CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "./login/login.service";
import {Injectable} from "@angular/core";

@Injectable()
// CanLoad é associado com as rotas que tem o elemento "loadChildren"
// Serve para dizer se o módulo que está sendo carregado de forma tardia, pode ou não ser carregado,
// de acordo com a condição criada (se retornar "false", módulo ñ é carregado do BE ao FE)
export class LoggedInGuard implements CanLoad, CanActivate{

    constructor(private loginService: LoginService){}

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if(!loggedIn){
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }

    // Método recebendo parâmetro que diz qual a configuração da rota que vai ser associada
    canLoad(route: Route): boolean{
        //console.log('CanLoad')

        //rota não está ativada ainda
        return this.checkAuthentication(route.path)
    }

    // ActivatedRouteSnapshot: representa já a rota ativada (uma foto do "ActivatedRoute" no momento que o método é chamado),
    // RouterStateSnapshot: árvore de "ActivatedRouteSnapshot", tendo todoo o caminho de todas as rotas q foram ativadas,
    // até chegar na nossa. Se houver rotas 'parents', seria possível acessa-las pelo "RouterStateSnapshot"
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        //console.log('CanActivate')

        //já tem todas as infos da rota que vai ser ativada (como parâmetros, objetos)
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }

}
