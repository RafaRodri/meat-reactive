class Order {

    constructor(
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = [],
        public id?: string
    ){}

}

// classe para representar o item da compra
// informando para o backend a QUANTIDADE e IDENTIFICAÇÃO do item (todas as outras infos do produto, ele já possui)
class OrderItem {

    constructor(public quantity: number, public menuId: string){}

}

export {Order, OrderItem}