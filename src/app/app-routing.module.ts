import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [authGuard]}, //Determina si se permite la activación de la ruta. Si el authGuard retorna `false` o un `UrlTree`, la navegación se cancela o redirige. Si authGuard retorna true, entonces si permite navegar a esta ruta.
  {path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoriesComponent, canActivate: [authGuard]},

  {path: 'posts', component: AllPostComponent, canActivate: [authGuard]},
  {path: 'posts/new', component: NewPostComponent, canActivate: [authGuard]},
  {path: 'subscribers', component: SubscribersComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
