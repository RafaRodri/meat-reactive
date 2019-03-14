import { Component, OnInit } from '@angular/core';
import {RadioOption} from "../shared/radio/radio-option.model";
import {OrderService} from "./order.service";
import {CartItem} from "../restaurant-detail/shopping-cart/cart-item.model";
import {Order, OrderItem} from "./order.model";
import {Router} from "@angular/router";

import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPatter = /^[0-9]*$/

  orderForm: FormGroup

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
        this.orderForm = this.formBuilder.group({
            //propriedades que representam os inputs do formulário

            //utilizando a forma de criação, passando o valor do campo diretamente no objeto
            //name: '',

            //utilizando método "control" de formBuilder, que cria o component
            name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
            email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
            emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
            address:this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
            number:this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPatter)]),
            optionalAddress:this.formBuilder.control(''),
            paymentOption:this.formBuilder.control('', [Validators.required])
        })
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
