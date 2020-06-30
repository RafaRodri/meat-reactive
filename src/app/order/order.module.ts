import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { LeaveOrderGuard } from "./leave-order.guard";


const ROUTES: Routes = [
    // o método "canDeactivate", está usando o estado do componente para tomar a decisão, logo, ao invés de uma rota que
    // tenha "loadChildren" (path: 'order' em app.routes.ts, que carrega um módulo), é preciso uma rota que tenha a declaração do componente
    { path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard] }
]

@NgModule({
    declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]  // importa o SharedModule sem os providers (lazy loading)
})

export class OrderModule { }