import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {provideStorage, getStorage } from '@angular/fire/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment.prod';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // para habilitar la funcionalidad de formularios reactivos en la aplicación. Específicamente, FormsModule permite el uso de la directiva ngModel, que se utiliza para enlazar datos bidireccionalmente entre los elementos del formulario HTML y las propiedades del componente.
    ReactiveFormsModule,
    ToastrModule.forRoot(), //para configurar el módulo a nivel global cuando lo importas en el módulo raíz de la aplicación. Esto significa que ngx-toastr se configurará de una vez y estará disponible para ser usado en cualquier parte de tu aplicación.
    BrowserAnimationsModule,
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Inicializa Firebase
    provideFirestore(()=> getFirestore()), // Importa y configura Firestore
    provideStorage(()=> getStorage()),    // proporciona una interfaz para interactuar con Firebase Storage dentro de aplicaciones Angular. Firebase Storage permite almacenar y servir archivos, como imágenes, videos y otros contenidos generados por el usuario.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
