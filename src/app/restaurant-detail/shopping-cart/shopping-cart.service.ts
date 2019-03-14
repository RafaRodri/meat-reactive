import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model"

export class ShoppingCartService {
    items: CartItem[] = []

    clear(){
        this.items = []
    }

    addItem (item: MenuItem) {
        //comparar o id do item que está dentro do array com o que está sendo add
        //para saber se o item já está dentro do carrinho
        let foundItem = this.items.find((mItem)=> mItem.menuItem.id === item.id)

        //se encontrar, aumenta a quantidade
        if(foundItem){
            this.increaseQty(foundItem)
        }
        //senão, adiciona no array
        else{
            this.items.push(new CartItem(item))
        }
    }

    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1
    }

    removeItem (item: any) {
        //informar índice que quer começar a remover (a partir do item que estamos)
        //e a quantidade
        this.items.splice(this.items.indexOf(item), 1)
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity - 1
        
        //remover item do carrinho, caso a quantidade chegue a 0
        if (item.quantity === 0){
            this.removeItem(item)
        }
    }

    total(): number {
        //map para substituir o item pelo seu valor
        //reduce recebendo o valor anterior e o atual, e retornando a soma a partir do 0
        return this.items
            .map(item => item.value())
            .reduce((prev,value)=> prev+value, 0)
    }
}