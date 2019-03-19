import {Injectable} from "@angular/core";
import {ShoppingCartService} from "../restaurant-detail/shopping-cart/shopping-cart.service";
import {CartItem} from "../restaurant-detail/shopping-cart/cart-item.model";
import {Order, OrderItem} from "./order.model";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MEAT_API} from "../app.api";
import {LoginService} from "../security/login/login.service";

@Injectable()
export class OrderService {

    // Criar acesso ao "ShoppingCartService"
    constructor(private cartService: ShoppingCartService,
                private http: HttpClient,
                private loginService: LoginService){}

    // Método para repassar valor dos items para o "CartService"
    itemsValue(): number {
        return this.cartService.total()
    }

    // Métodos específicos para compras, para expor coisas que já são fornecidos pelo "ShoppingCartService"
    // Expor items do carrinho
    cartItems(): CartItem[]{
        return this.cartService.items
    }

    // Métodos necessários para responder aos eventos
    increaseQty(item: CartItem){
        //Deixar a manipulação para o "ShoppingCartService"
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        //Deixar a manipulação para o "ShoppingCartService"
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        //Deixar a manipulação para o "ShoppingCartService"
        this.cartService.removeItem(item)
    }

    clear(){
        this.cartService.clear()
    }

    //Servidor vai retornar id para a compra realizada
    checkOrder(order: Order): Observable<string>{
        //const headers = new Headers()
        //informar nome e valor do header
        //headers.append('Content-type', 'application/json')

        let headers = new HttpHeaders() //objeto imutável q faz parte do novo módulo HttpClient
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }

        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
            .map(order => order.id)
    }

}