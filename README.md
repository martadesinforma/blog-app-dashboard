## Estructura de esta aplicación:

1. Creación de los siguientes componentes :
- Login Component
- Subcription-form Component
- Comment Component

- all-post Component, new-post Component en la carpeta posts
- Categories Component
- Dashboard Component
- Header Component en la carpeta layouts
- Footer Component en la carpeta layouts

2. Creación de servicios en la carpeta services
- Categories service 




## Este es un breve listado del contenido del proyecto:

1. Uso de Bootstrap al haber lanzado el comando `npm i bootstrap@4.6` y al haber escrito dentro de styles de  angular.json `"node_modules/bootstrap/dist/css/bootstrap.min.css"` para incluir el archivo de Bootstrap como un estilo global, para que estén disponibles en toda la aplicación.

2. Uso de los iconos de Font Awesome al haber escrito en el archivo index.html el link para poder usar los iconos. Para incluir los iconos solo he tenido que copiar la clase del icono en componentes donde lo quiera utilizar, por ejemplo en dashboard.component.html he escrito ` <h1><i class="fas fa-clipboard-list"></i></h1>` para tener el icono de una libreta en este component.

3. Uso de Firebase. Como esta plataforma gratuita nos brinda varias funcionalidades, haremos uso de la autenticación (para que el usuario inicie sesión en nuestra aplicación), usaremos Firestore Database (conecta nuestra app a una base de datos), utilizaremos el storage (para almacenar y recuperar el contenido generado por el usuario).  Lo primero que tenemos que hacer es crear una aplicación en Firebase. Al crearnos la aplicación, vamos a obtener el código de configuracion de la app firebase que vamos a copiar en el archivo environment.prod.ts. Ahora para conectar nuestro proyecto con la app creada en firebase, tenemos que escribir en la terminal de nuestro proyecto: `ng add @angular/fire`. Cuando se termina de instalar, tenemos que importar en el app.module.ts los módulos. En lugar de importar un solo módulo que incluya todas las funcionalidades de Firebase (como Firestore, Authentication, Storage, etc.), ahora necesitas importar y configurar individualmente cada una de las características que vayas a usar en tu proyecto de Angular.

3. 1. Insertar, cargar, eliminar y editar  información en la base de datos de  Firestore mediante el  servicio categories y mostrar la información guardada en Firestore en nuestro componente categories mediante una tabla.

3. 2. Insertar, cargar, eliminar y editar  información en la base de datos de  Firestore mediante el  servicio categories y mostrar la información guardada en Firestore en nuestro componente categories mediante una tabla. Trabajo adicional: algoritmos adicionales para la categoria seleccionada y como subir una imagen a firebase (cloud storage)

4. Uso de routerLink  (.html)

5. Uso de Formularios Basados en Plantillas y validación de  formulario en el componente categories 

6. Uso del  paquete ngx-toastr al haber escrito en la terminal  `npm i ngx-toastr` y al haber escrito en los styles de angular.json `"node_modules/ngx-toastr/toastr.css"`. En app.module he hecho la importación del módulo ToastrModule.  Una vez que he registrado ToastrModule en AppModule, ToastrService se convierte en una dependencia inyectable en toda tu aplicación. Para usar las funcionalidades de ngx-toastr dentro de mi servicio categories.service.ts, he tenido que importar `ToastrService`. Para que se pueda usar correctamente, tambien he escrito en la terminal ` npm i @angular/platform-browser` y en app.module he importado ` BrowserAnimationsModule,`. Toastr sirve para mostrar notificaciones de tipo "toast" en tu aplicación. Estas notificaciones suelen aparecer en la esquina de la pantalla y se utilizan para mostrar mensajes breves, como alertas, advertencias, confirmaciones, entre otros.

