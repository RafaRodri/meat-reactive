import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'
import {NotificationService} from "../notification.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
      //Definir animação através da função trigger
      trigger('snack-visibility',[

          //Estados
          state('hidden', style({
              opacity: 0,
              bottom: '0px' //valor literal (0) ou string ('0px')
              })),
          state('visible', style({
              opacity: 1,
              bottom: '30px'
              })),

          //Transições
              //animate(duração, delay, easing(como vai entrar ou sair))
          transition('hidden => visible', animate('500ms 0s ease-in')),
          transition('visible => hidden', animate('500ms 0s ease-out'))

      ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!'
  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier.do(message => {
          //pegar a mensagem
          this.message = message

          //mudar a visibilidade do snackbar
          this.snackVisibility = 'visible'
      }).switchMap(message => Observable.timer(3000))
        .subscribe(timer => this.snackVisibility = 'hidden')
  }

  // toggleSnack(){
  //   this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible' : 'hidden'
  // }

}
