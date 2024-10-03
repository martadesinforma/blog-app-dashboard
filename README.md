## Pasos a seguir para hacer uso de este proyecto

1. Clonar el proyecto
2. Copiar este código de configuración de firebase en el archivo environment.prod.ts
```typescript
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyBL02IMmk19y4jTDFkQMOiUdOUB2qjs53U",
    authDomain: "blog-app-dashboard-6797b.firebaseapp.com",
    projectId: "blog-app-dashboard-6797b",
    storageBucket: "blog-app-dashboard-6797b.appspot.com",
    messagingSenderId: "633780146277",
    appId: "1:633780146277:web:9fa756b55eacedb19f768c"
  }
}
```
3. Ejecutar npm install
4. Ejecutar la app ng serve -o

## Estructura de esta aplicación:

1. Creación de los siguientes componentes:


- all-post Component, new-post Component en la carpeta posts
- Categories Component
- Dashboard Component
- Subscribers Component
- Header Component en la carpeta layouts
- Footer Component en la carpeta layouts
- Login Component en la carpeta auth

2. Creación de servicios y guard en la carpeta services
- Categories service 
- Posts service
- Auth service
- Subscribers service
- Auth guard

3. Creación de interfaces en la carpeta models:
- Category interface
- Post interface

4. Creación de la carpeta environments
- environment.prod.ts
- environment.ts


## Este es un breve listado del contenido del proyecto:

1. Uso de Bootstrap al haber lanzado el comando `npm i bootstrap@4.6` y al haber escrito dentro de styles de  angular.json `"node_modules/bootstrap/dist/css/bootstrap.min.css"` para incluir el archivo de Bootstrap como un estilo global, para que estén disponibles en toda la aplicación.

2. Uso de los iconos de Font Awesome al haber escrito en el archivo index.html el link para poder usar los iconos. Para incluir los iconos solo he tenido que copiar la clase del icono en componentes donde lo quiera utilizar, por ejemplo en dashboard.component.html he escrito ` <h1><i class="fas fa-clipboard-list"></i></h1>` para tener el icono de una libreta en este component.

3. Uso de Firebase. Como esta plataforma gratuita nos brinda varias funcionalidades, haremos uso de la autenticación (para que el usuario inicie sesión en nuestra aplicación), usaremos Firestore Database (conecta nuestra app a una base de datos), utilizaremos el storage (para almacenar y recuperar el contenido generado por el usuario).  Lo primero que tenemos que hacer es crear una aplicación en Firebase. Al crearnos la aplicación, vamos a obtener el código de configuracion de la app firebase que vamos a copiar en el archivo environment.prod.ts. Ahora para conectar nuestro proyecto con la app creada en firebase, tenemos que escribir en la terminal de nuestro proyecto: `ng add @angular/fire`. Cuando se termina de instalar, tenemos que importar en el app.module.ts los módulos. En lugar de importar un solo módulo que incluya todas las funcionalidades de Firebase (como Firestore, Authentication, Storage, etc.), ahora necesitas importar y configurar individualmente cada una de las características que vayas a usar en tu proyecto de Angular.

3. 1. Insertar, cargar, eliminar y editar  información en la base de datos de  Firestore mediante el  servicio categories y mostrar la información guardada en Firestore en nuestro componente categories mediante una tabla.

3. 2. Almacenamiento de imagenes del usuario en Cloud Storage de la nube de Firebase y  obteneción de  la URL de descarga de esa imagen. Todo esto mediante el servicio posts. Uso de este servicio post en el componente new-post

3. 3. Cargar  información en la base de datos de  Firestore mediante el  servicio posts y mostrar la información guardada en Firestore en nuestro componente all-post mediante una tabla.

3. 4. Editar  información en la base de datos de  Firestore mediante el  servicio posts en nuestro componente new-post

3. 5. Eliminar un post  en la base de datos de  Firestore y la imagen del Storage de Firestore mediante el  servicio posts en nuestro componente all-post

3. 6. Uso de Authentication de Firebase en Angular en el servicio auth y en el componente login y header. En el servicio auth vamos a capturar los datos de los usuario registrados en Authentication de  Firebase y los vamos a guardar en el LocalStorage. Estos datos los vamos a recuperar del LocalStorage en el componente header.

3. 7. Insertar, cargar, eliminar   información en la base de datos de  Firestore mediante el  servicio subscriber y mostrar la información guardada en Firestore en nuestro componente subscribers mediante una tabla.

4. Uso de routerLink  (.html)

5. Uso de Formularios Basados en Plantillas y validación de  formulario en el componente categories y en el componente login. Uso de formulario reactivo y validación de formulario en el componente new-post

6. Uso del  paquete ngx-toastr al haber escrito en la terminal  `npm i ngx-toastr` y al haber escrito en los styles de angular.json `"node_modules/ngx-toastr/toastr.css"`. En app.module he hecho la importación del módulo ToastrModule.  Una vez que he registrado ToastrModule en AppModule, ToastrService se convierte en una dependencia inyectable en toda tu aplicación. Para usar las funcionalidades de ngx-toastr dentro de mi servicio categories.service.ts, he tenido que importar `ToastrService`. Para que se pueda usar correctamente, tambien he escrito en la terminal ` npm i @angular/platform-browser` y en app.module he importado ` BrowserAnimationsModule,`. Toastr sirve para mostrar notificaciones de tipo "toast" en tu aplicación. Estas notificaciones suelen aparecer en la esquina de la pantalla y se utilizan para mostrar mensajes breves, como alertas, advertencias, confirmaciones, entre otros.

7. Uso del  paquete @kolkov/angular-editor al haber escrito en la terminal  `npm i @kolkov/angular-editor`. Este paquete es un editor WYSIWYG (What You See Is What You Get) para Angular, que permite a los usuarios crear y editar contenido enriquecido en una aplicación Angular, similar a lo que podrías hacer en un editor de texto como Microsoft Word. En app.module he hecho la importación del módulo AngularEditorModule y del modulo HttpClientModule para poder usar este paquete. En el angular.json he tenido que agregar en assets un objeto. Lo he usado en new-post.component.html




8. Uso de Guard:  canDeactivate (app.routes.ts). Queremos acceder a la página principal y al resto de páginas (excepto la página de login) solo si el usuario inició sesión. De lo contrario quiero bloquear el acceso a la página principal y a las demás páginas y que me redirija a la página de login, para que solo pueda acceder a las demás páginas si esta logeado.
