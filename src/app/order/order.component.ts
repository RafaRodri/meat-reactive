import { Component, OnInit } from '@angular/core';
import {RadioOption} from "../shared/radio/radio-option.model";
import {OrderService} from "./order.service";
import {CartItem} from "../restaurant-detail/shopping-cart/cart-item.model";
import {Order, OrderItem} from "./order.model";
import {Router} from "@angular/router";

import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm = FormGroup

  delivery: number = 8

  paymentOptions: RadioOption[] = [
      {label: 'Dinheiro', value: 'MON'},
      {label: 'Cartão de Débito', value: 'DEB'},
      {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.orderForm = this.formBuilder.group(){
          //propriedades que representam os inputs do formulário
          
      }
  }

  itemsValue(): number {
      return this.orderService.itemsValue()
  }

  cartItems(): CartItem[]{
      return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
      this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
      this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
      this.orderService.remove(item)
  }

  checkOrder(order: Order){
      order.orderItems = this.cartItems()
          .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))

      //recebendo um orderId (string) e a implementando
      this.orderService.checkOrder(order)
          .subscribe((orderId: string) => {
              //Se realmente receber alguma coisa
              this.router.navigate(['/order-summary'])
              //console.log(`Compra concluída: ${orderId}`)
              this.orderService.clear()
          })

      console.log(order)
  }

}
