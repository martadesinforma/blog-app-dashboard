import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';


//cuando este Guard retorna true, le dice al router que permita la navegación hacia la ruta solicitada (se sabe que ruta es la solicitada porque lo vemos en el app-routing). Cuando retorna false, le dice al router que bloquee la navegación hacia la ruta solicitada
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isLoggedInGuard) { //si isLoggedInGUard es true es  porque el usuario está autenticado en el login
    return true;
  } else { //si isLoggedInGUard es false es porque el usuario ha cerrado sesión
    // toastr.warning('You dont have permission to access this page...');
    router.navigate(['/login']);
    return false;
  }
};
