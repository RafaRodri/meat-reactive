import {Injectable} from "@angular/core";
import {ShoppingCartService} from "../restaurant-detail/shopping-cart/shopping-cart.service";
import {CartItem} from "../restaurant-detail/shopping-cart/cart-item.model";
import {Order, OrderItem} from "./order.model";
import {Observable} from "rxjs/Observable";
import {Headers, Http, RequestOptions} from "@angular/http";
import {MEAT_API} from "../app.api";

@Injectable()
export class OrderService {

    // Criar acesso ao "ShoppingCartService"
    constructor(private cartService: ShoppingCartService, private http: Http){}

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
        const headers = new Headers()

        //informar nome e valor do header
        headers.append('Content-type', 'application/json')

        //chamar método post, informando: URL, Objeto que vai ser enviado e headers
        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order), new RequestOptions({headers: headers}))
            .map(response => response.json())
            .map(order => order.id)
    }

}