import {EventEmitter} from "@angular/core";

export class NotificationService {
    notifier = new EventEmitter<string>()

    // Criar método que vai passar uma mensagem para o método emit "notifier",
    // (permitindo que as outras partes da aplicação possam utiliza-lo)
    notify(message: string){
        this.notifier.emit(message)
    }

}