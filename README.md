## Estructura de esta aplicación:

1. Creación de los siguientes componentes :
- Login Component
- Category Component
- Post-Card Component
- Subcription-form Component
- Comment Component
- Dashboard Component
- Header Component en la carpeta layouts
- Footer Component en la carpeta layouts




## Este es un breve listado del contenido del proyecto:

1. Uso de Bootstrap al haber lanzado el comando `npm i bootstrap@4.6` y al haber escrito dentro de styles de  angular.json `"node_modules/bootstrap/dist/css/bootstrap.min.css"` para incluir el archivo de Bootstrap como un estilo global, para que estén disponibles en toda la aplicación.

2. Uso de los iconos de Font Awesome al haber escrito en el archivo index.html el link para poder usar los iconos. Para incluir los iconos solo he tenido que copiar la clase del icono en componentes donde lo quiera utilizar, por ejemplo en dashboard.component.html he escrito ` <h1><i class="fas fa-clipboard-list"></i></h1>` para tener el icono de una libreta en este component.

3. Uso de Firebase. Como esta plataforma gratuita nos brinda varias funcionalidades, haremos uso de la autenticación (para que el usuario inicie sesión en nuestra aplicación), usaremos data connect (conecta nuestra app a una base de datos), utilizaremos el storage (para almacenar y recuperar el contenido generado por el usuario).  Lo primero que tenemos que hacer es crear una aplicación de Firebase. Al crearnos la aplicación, vamos a obtener el código de configuracion de la app firebase que vamos a copiar en el archivo environment.prod.ts. Ahora para conectar nuestro proyecto con la app creada en firebase, tenemos que escribir en la terminal de nuestro proyecto: `ng add @angular/fire`. Cuando se termina de instalar, tenemos que importar en el app.module.ts el modulo provideFirebaseApp e  initializeApp.
