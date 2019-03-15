import {NgModule, ModuleWithProviders} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from "./input/input.component";
import {RadioComponent} from "./radio/radio.component";
import {RatingComponent} from "./rating/rating.component";

//módulo com as diretivas básicas
//não foi preciso no root module, porque já é importado indiretamente pelo browser module
import {CommonModule} from "@angular/common";
import {ShoppingCartService} from "../restaurant-detail/shopping-cart/shopping-cart.service";
import {RestaurantsService} from "../restaurants/restaurants.service";
import {OrderService} from "../order/order.service";
import {SnackbarComponent} from './messages/snackbar/snackbar.component';
import {NotificationService} from "./messages/notification.service";

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent,
                CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders{
        //retornar objeto com duas propriedades
        // 1- o próprio SharedModule com todas as configurações necessárias para importar em outros lugares
        // 2- providers
        return{
            ngModule: SharedModule,
            providers: [ShoppingCartService, RestaurantsService, OrderService, NotificationService]
        }
    }
}