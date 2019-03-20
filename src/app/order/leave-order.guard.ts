import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route} from '@angular/router'
import {OrderComponent} from "./order.component";

//interface espera um tipo genérico, que é o componente que está sendo associado a opção
//podendo utilizar o próprio componente ou seu estado (podendo chamar um método, acessar uma propriedade)
//para determinar se no momento, realmente se deve autorizar uma navegação p outro componente
//neste caso, será usado o "OrderComponent"
export class LeaveOrderGuard implements CanDeactivate <OrderComponent>{

        // pode-se retornar um Observable ou uma promisse também
        canDeactivate(orderComponent: OrderComponent,
                      activatedRoute: ActivatedRouteSnapshot,
                      routerState: RouterStateSnapshot): boolean {

            if (!orderComponent.isOrderCompleted()) {
                return window.confirm('Deseja disistir da compra?')
            }else {
                return true
            }

        }

}