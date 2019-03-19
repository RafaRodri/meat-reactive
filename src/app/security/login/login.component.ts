import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {NotificationService} from "../../shared/messages/notification.service";


@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required])
    })
  }

  login(){
    this.loginService.login(this.loginForm.value.email,
                            this.loginForm.value.password)
        .subscribe(user =>  // callback de sucesso (obetendo dado que veio na resposta)
                    this.notificationService.notify(`Bem vindo, ${user.name}`),
                   response =>  // callback de erro (tratar possível erro)
                                // response é do tipo "HttpErrorResponse"
                    this.notificationService.notify(response.error.message))
  }

}
