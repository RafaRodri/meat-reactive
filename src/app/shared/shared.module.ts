import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";

//módulo com as diretivas básicas
//não foi preciso no root module, porque já é importado indiretamente pelo browser module
import { CommonModule } from "@angular/common";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { OrderService } from "../order/order.service";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from "./messages/notification.service";
import { LoginService } from "../security/login/login.service";
import { LoggedInGuard } from "../security/loggedin.guard";
import { LeaveOrderGuard } from "../order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../security/auth.interceptor";



@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent, CommonModule,
        FormsModule, ReactiveFormsModule, SnackbarComponent]
})

export class SharedModule {
	// ao invés de deixar o core module, podemos passar tudo que ele faz para o shared.module, que já exporta todos nossos inputs (tornando o "core.module.ts" desnecessário)
        // utilizar o objeto ModuleWithProviders do angular, que permite a importação de um módulo de uma forma diferente (com ou sem os providers)
        // ideal para situação onde se importa um módulo no root module e em vários outros módulos que são carregados de forma tardia
    static forRoot(): ModuleWithProviders {
        //retornar objeto com duas propriedades
        // 1- o próprio SharedModule com todas as configurações necessárias para importar em outros lugares
        // 2- providers
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService,
                RestaurantsService,
                OrderService,
                NotificationService,
                LoginService,
                LoggedInGuard,
                LeaveOrderGuard,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
        }
    }
}