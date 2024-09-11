import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userEmail: string = '';
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {



    this.isLoggedIn$ = this.authService.isLoggedIn().pipe(tap((isLoggedIn)=>{ //tap permite ejecutar código en cada emisión del observable, pero no altera el valor emitido.
      if (isLoggedIn) {
        this.userEmail = JSON.parse(localStorage.getItem('user')!).email;
      }else{
        this.userEmail = '';
      }
    })); //isLoggedIn$ es un Observable<boolean> por lo que cuando lo usemos en el header.component.html nos tenemos que suscribir.
  }

  onLogOut() {
    this.authService.logOut();

  }

}
