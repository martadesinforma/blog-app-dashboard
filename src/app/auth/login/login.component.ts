import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  //el email que hay que ingresar (el que está configurado en el Authentication de Firebase y que tiene que coincidir con el ingresado por el usuario) es: marta@gmail.com y la contraseña 123456
  onSubmit(formValue:any){
    this.authService.login(formValue.email, formValue.password)
  }

}
