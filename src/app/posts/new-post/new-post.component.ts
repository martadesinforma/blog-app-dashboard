import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.jpg'; /* con ./ nos referimos a la raiz http://localhost:65439/  */
  selectedImg: any;
  categories: Array<any> = [];
  postForm!: FormGroup;
  post!: Post;
  formStatus: string = 'Add New';
  docId: string = '';

  constructor(
    private catgoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute,
  ) {

    this.postForm = this.fb.group({ //postForm va a ser mi formulario reactivo y dentro voy a definir cada una de las propiedades que quiero que mi formulario maneje.
      title: ['', [Validators.required, Validators.minLength(10)]], //el primer elemento es el valor por defecto,lo segundo son validaciones incronas y lo tercero validaciones asincronas
      permalink: ['', [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });

    //se utiliza para suscribirse a los (query parameters) que están presentes en la URL.
    this.route.queryParams.subscribe(params => {
      console.log(params); //cuando estemos creando un nuevo post y la url sea esta: http://localhost:4200/posts/new, el val tendrá este valor: {}. En cambio cuando estemos editando un post y la url sea esta: http://localhost:4200/posts/new?id=5XGQxPRUk8UmexChS9Y6, el params tendrá el valor: {id: '5XGQxPRUk8UmexChS9Y6'}

      this.docId = params['id'];

      if (!params['id']) return; //si no existe el id en los params (esto quiere decir que la url luce asi:http://localhost:4200/posts/new ), entonces se sale de la función y el formularios no tendrá los valores por defecto ya seteados con los valores del post sino que sus valores serán ''

      this.postService.loadOneData(params['id']).subscribe(post => {
        console.log(post) //post luce así: {excerpt: 'El pipe date en Angular se utiliza para formatear..., views: 0, category: {…}, title: 'marta oacaña martin', isFeatured: false, id: "5XGQxPRUk8UmexChS9Y6"...}
        //Ahora hay que cargar los datos relevantes del objeto post dentro de los campos de entrada del formulario
        this.post = post;

        this.postForm.setValue({
          title: this.post.title,
          permalink: this.post.permalink,
          excerpt: this.post.excerpt,
          category: `${this.post.category.categoryId}-${this.post.category.category}`,
          postImg: '',
          content: this.post.content
        });

        this.imgSrc = this.post.postImgPath;
        this.postForm.get('postImg')?.clearValidators(); // Remover el validador required de postImg. No quiero que sea obligatorio tener que subir una nueva imagen para poder enviar el formulario cuando estamos editando el post.
        this.postForm.get('postImg')?.updateValueAndValidity(); // Actualizar el estado de validación

        this.formStatus = 'Edit'


      });
    });
  }

  ngOnInit(): void {
    this.catgoryService.loadData().subscribe(val => {
      this.categories = val; //val es la colección categories de firebase
    })
  }

  // el método get formControl es un accesor que permite acceder fácilmente a los controles del formulario reactivo postForm en la plantilla HTML o en otros métodos del componente.
  get formControl() {
    return this.postForm.controls
  }

  //La función onTitleChanged($event: any) se utiliza para transformar el valor de un campo de entrada de texto, reemplazando los espacios en blanco por guiones (-).
  onTitleChanged($event: any) {
    const title = $event.target.value; //obtengo el valor de entrada del input
    this.permalink = title.replace(/\s/g, '-');//quiero reemplazar los espacios que se pueden escribir cuando ingresas información en el input del título por -. Se utiliza esta es una expresión regular /\s/g para buscar todos los espacios en blanco
  }


  //Esta función permite seleccionar una imagen desde tu dispositivo y mostrar una vista previa de la misma antes de subirla.
  showPreview($event: any) {
    const reader = new FileReader(); //Crea una nueva instancia de FileReader, un objeto nativo de JavaScript que permite leer el contenido de archivos de manera asíncrona. Este código permite que, cuando un usuario selecciona una imagen, se lea el archivo usando FileReader

    reader.readAsDataURL($event.target.files[0]) //reader.readAsDataURL($event.target.files[0]) toma el primer archivo que el usuario seleccionó (es decir, el archivo en files[0]) y lo lee como una URL de datos. Una vez que la lectura del archivo se completa, el evento onload del FileReader se dispara, permitiendo que el código dentro de esa función (como actualizar this.imgSrc) se ejecute.

    reader.onload = (e) => { //onload es una propiedad que pertenece al objeto FileReader. Una vez que la lectura es exitosa, se ejecuta la función que asignaste a onload
      this.imgSrc = e.target?.result //e.target?.result contiene los datos del archivo en el formato especificado (en este caso, una URL de datos). Es decir, imgSrc almacena el resultado de la lectura del archivo en forma de URL de datos. imgSrc luce: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB0IAAAMw
    }

    this.selectedImg = $event.target.files[0]; //selectedImg almacena directamente el archivo seleccionado. Este objeto contiene toda la información del archivo. selectedImg luce: {name: 'foto 3.png', lastModified: 1723558710495, lastModifiedDate: Tue Aug 13 2024 16:18:30 GMT+0200 (hora de verano de Europa central), webkitRelativePath: '', size: 129776, …}
  }


  async onSubmit(formStatus: string) { //convertimos esta funcion en una promesa asincrona con async para poder usar dentro el await.
    let splitted = this.postForm.value.category.split('-'); //splitted tiene un valor de este tipo: ['EMElfUy1NoNs3OPkNlAB', 'hola'] donde el primer valor del array es el id y el segundo es la data de category

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: this.selectedImg ? '': this.post.postImgPath, //cuando en el formulario subo una imagen (ya sea pq subo un archivo de 0 o pq edito una imagen existente), selectedImg tiene valor vacio que se rellenrá mas tarde con la url generada. Si estoy editando pero no he cargado una nueva imagen, postImgPath tiene el valor del post original
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: Timestamp.fromDate(new Date()),
    }

    if (this.selectedImg) { //esto sucede cuando  he cargado una nueva imagen que selectedImg tiene como valor un archivo
      const url = await this.postService.uploadImage(this.selectedImg); //cuando llamo a uploadImage, obtengo una promesa, por eso puedo usar el await para "esperar" a que la promesa se resuelva. Cuando se resuelve esta promesa, se obtiene  la URL de descarga del archivo almacenado en el storage de Firebase.

      postData.postImgPath = url; //postImgPath luce: "https://firebasestorage.googleapis.com/v0/b/blog-app-dashboard-6797b.appspot.com/o/postIMG%2
    }


    /*  Si en vez de utilizar el await para esperar a que la promesa se resuleva y obtener el valor de la promesa usase  el método then para manejar una promesa, el código dentro de then se ejecuta después.  Como then es una operación asincrónica, la ejecución del código continúa sin esperar a que la promesa se resuelva. Es decir, antes de obtener el valor de la promesa, ya se ha ejecutado el return postData, por lo que postData.postImgPath todavía es undefined:

    this.postService.uploadImage(this.selectedImg, postData).then((url)=>postData.postImgPath = url );
    return postData; // ESTO ESTA MAL NUNCA SE ASIGNA LA URL
     */


    if (formStatus === 'Edit') {


      if(this.selectedImg){ //si cargas una nueva imagen sectedImg tiene como valor un archivo. Me interesa borrar la iamgen anterior del Storage. Si no tiene valor es porque la imagen no se ha editado y no  tengo que borrarla del storage.
        const path = this.post.postImgPath; //esta es la url de la imagen original que quiero borrar del storage
        this.postService.deleteImage(path); //para borrar la viea imagen del storage
      }
      this.postService.updateData(this.docId, postData); //para que cuando ya se han modificado todos los input de postData por parte del usuario, se actualice el valor de postData en la Database de Firestore y la imagen en el Storage de Firestore
    } else {
      this.postService.saveData(postData); //para que cuando ya se ha configurado postData con el valor de la url en la propiedad postImgPath, se guarde el valor de postData en la Database de Firestore
    }


    this.postForm.reset(); //Para que después de enviar la info del formulario se limpien los input
    this.imgSrc = './assets/placeholder-image.jpg';


  }

}
