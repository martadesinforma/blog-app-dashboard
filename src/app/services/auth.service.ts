import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Un BehaviorSubject es un tipo especial de Observable que siempre almacena el último valor emitido y lo devuelve inmediatamente a cualquier suscriptor nuevo. El BehaviorSubject se utiliza para rastrear y emitir el estado de si el usuario está o no autenticado (logged in). Usas el método .next() del BehaviorSubject para emitir un nuevo valor. Por ejemplo, cuando el usuario inicie o cierre sesión, puedes actualizar el estado de autenticación.
  isLoggedInGuard: boolean = false; //cuando el usuario se autentica en el login, isLoggedInGUard pasa a ser true y cuando el usuario cierra sesión, isLoggedInGUard pasa a ser false

  constructor(private auth: Auth, private toastr: ToastrService, private router: Router) {

  }


  //Esta función asegura que el usuario es autenticado y manejado adecuadamente tanto en caso de éxito como en caso de error.
  login(email: string, password: string) {
    // Llamada a signInWithEmailAndPassword, que  espera los argumentos email y contraseña
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(logRef => {
        // Login exitoso
        this.toastr.success('Logged In Successfully!');
        this.loadUser();
        this.isLoggedInGuard = true;
        this.router.navigate(['/']); //Si el usuario ha ingresado usuario y contraseña válidas que coinciden con las configuradas en Firebase Authentication, será redirigido a la URL '/'

      })
      .catch(error => {
        // Manejo del error
        this.toastr.warning(error);
      });
  }

  //La función loadUser() suscribe al observable authState para obtener el estado del usuario autenticado y guarda la información del usuario en el LocalStorage bajo la clave 'user'. Se va a recuperar la info guardada en el localStorage en el componente header.
  loadUser() {
    authState(this.auth).subscribe(user => { // authState es un observable que emite el estado del usuario autenticado en Authentication de Firebase
      //quiero grabar en el LocalStorage user  bajo el nombre user. la variable user va a contener un objeto con la información en el LocalStorage
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn.next(true); //para actualizar el estado de autenticación.
      }

    });
  }


  //La función logOut() cierra la sesión del usuario, muestra un mensaje de éxito, elimina la información almacenada en el localStorage y redirige al usuario a la página de inicio de sesión. Se va a utilizar en el componente header.
  logOut() {
    this.auth.signOut() //es un método que cierra la sesión del usuario actual autenticado en Firebase. Esto desconecta al usuario de la aplicación, eliminando su estado de autenticación en el cliente.
      .then(() => {
        this.toastr.success('User Logged Out Successfully!');
        localStorage.removeItem('user');
        this.loggedIn.next(false); //para actualizar el estado de autenticación.
        this.isLoggedInGuard = false;
        this.router.navigate(['/login']);
      })
  }

  //Esta función retorna la variable loggedIn con el estado de autenticación como un observable. Lo vamos a utilizar en el  componente header.
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
