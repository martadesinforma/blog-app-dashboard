import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, FieldPath, Firestore, updateDoc } from '@angular/fire/firestore';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes, uploadBytesResumable, UploadTaskSnapshot } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { from, map, Observable, switchMap } from 'rxjs';
import { Post } from '../models/post';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: Storage, private firestore: Firestore, private toastr: ToastrService, private router: Router) { }


  //La función uploadImage está diseñada para subir una imagen a Firebase Storage y luego obtener la URL de descarga de esa imagen. Esta función devuelve una promesa. Esa promesa  se resuelve con un valor de tipo string, que en este caso es la URL de la imagen subida. Esta función va a ser llamada en el componente new-post
  uploadImage(selectedImage: any): Promise<string> {
    return new Promise((resolve, reject) => {

      const filePath = `postIMG/${Date.now()}`; //filePath luce: postIMG/1725378303844. Genera una ruta única para la imagen.
      const storageRef = ref(this.storage, filePath); //Crea una referencia al archivo en Firebase Storage con la ruta especificada por filePath.
      const uploadTask = uploadBytesResumable(storageRef, selectedImage); //Inicia la carga del archivo de manera resumible, lo que permite observar el progreso de la carga y manejar reinicios en caso de interrupciones.

      uploadTask.on('state_changed', {
        error: (error) => {
          reject();//reject: Es una función que se llama si la operación falla por algún motivo
        },
        complete: async () => { //convertimos esta funcion en una promesa asincrona con async para poder usar dentro el await.
          console.log('Image uploaded successfully!');
          const url = await getDownloadURL(storageRef); //getDownloadURL() es una promesa, por eso podemos usar el await para "esperar" a que la promesa se resuelva. Cuando se resuelve esta promesa, se obtiene  la URL de descarga del archivo almacenado en Firebase.

          resolve(url); //El valor que se pasa al `resolve()` dentro de una promesa es el valor que será capturado cuando la promesa se resuelva. Este valor se puede capturar utilizando `then()` o `await`.
        }
      });
    })
  }

  // Función para guardar datos de postData en una colección específica de Database de Firestore. Esta función va a ser llamada en el componente new-post
  async saveData(postData: Post) {
    const postsCollection = collection(this.firestore, 'posts'); // Crea/obtiene la colección 'posts' en firestore
    const docRef = await addDoc(postsCollection, postData);   // Añade el documento a la colección posts creada.
    this.toastr.success('Data Insert Successfully ..!')
    console.log('Data Insert Successfully ..!')
    this.router.navigate(['/posts']);
  }



  // Esta función está diseñada para cargar datos de la colección posts de Database Firestore y devolver un observable que emite un array de objetos. Cada objeto en el array contiene: el ID del documento y los datos del documento. Esta función va a ser llamada en el componente all-post
  loadData(): Observable<any[]> {
    const postsCollection = collection(this.firestore, 'posts'); // Crea/obtiene la colección 'posts' en firestore
    return collectionData(postsCollection, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'posts'. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, ...data }; // Retorna un array de objetos. Se veria de esta forma:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}]
      }))
    );
  }


  // Función para cargar datos de un único documento de la colección posts de Database Firestore (el documento cuyo id se encuentre en la url) y devuelve un observable. Cuando te suscribes al observable obtienes un objeto con los datos del documento que luce así: {excerpt: 'El pipe date en Angular se utiliza para formatear..., views: 0, category: {…}, title: 'marta oacaña martin', isFeatured: false, id: "5XGQxPRUk8UmexChS9Y6"...}
  loadOneData(id: any): Observable<any> {
    const postDocRef = doc(this.firestore, `posts/${id}`); // Obtener la referencia del documento
    return docData(postDocRef, { idField: 'id' }); // Obtener los datos del documento, con el campo `id` incluido si lo deseas
  }



  //Esta función  está diseñada para actualizar un documento específico en  la Database de Firestore y la imagen en el Storage de Firestore. Se va a utilizar en el componente new-post
  updateData(id: string, postData: any) {
    const docRef = doc(this.firestore, `posts/${id}`); // Referencia al documento. Esta referencia es una manera de "apuntar" o "dirigirse" al documento
    updateDoc(docRef, postData)  // Actualiza el documento con los nuevos datos
      .then(() => {
        this.toastr.success('Data Updated Successfully!');
        this.router.navigate(['/posts'])
      })
      .catch(error => {
        this.toastr.error('Error updating data: ' + error);
      });
  }


  //Esta función  está diseñada para eliminar una imagen específica de un post en el Storage de  Firestore. Se va a utilizar en el componente new-post
  deleteImage(path: string) {
    const storageRef = ref(this.storage, path); // Crea una referencia a la imagen en Firebase Storage
    deleteObject(storageRef) // Elimina la imagen del Storage
      .then(() => {
        console.log('Image deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting image: ', error);
      });
  }




  //Esta función  está diseñada para eliminar una imagen específica de un post en el Storage de  Firestore. Tambien llama a la funcion deleteData() para eliminar el documento de Database de Firestore. Se va a utilizar en el componente all-post
  deleteDataAndImage(postImagePath: string, id: string): void {
    const storageRef = ref(this.storage, postImagePath); // Crea una referencia a la imagen en Firebase Storage

    deleteObject(storageRef) // Elimina la imagen del Storage
      .then(() => {
        console.log('Image deleted successfully');

        this.deleteData(id); // Después de eliminar la imagen, llama a la funcion deleteData() para eliminar el documento de Database Firestore
      })
      .catch((error) => {
        console.error('Error deleting image: ', error);
      });
  }


   //Esta función  está diseñada para eliminar un documento específico en una colección de Database de  Firestore. Se va a utilizar en el componente all-post
  deleteData(id: string){
    const docRef = doc(this.firestore, `posts/${id}`);// Referencia al documento. Esta referencia es una manera de "apuntar" o "dirigirse" al documento
    deleteDoc(docRef)
        .then(() => {
          this.toastr.warning('Data Deleted..!');
        })

  }


  //La función markFeatured está diseñada para actualizar un campo específico en un documento de Firestore, en este caso,  el campo que marca un post como destacado (featured)
  markFeatured(id: any, featuredData: any) {
    const docRef = doc(this.firestore, `posts/${id}`); // Referencia al documento. Esta referencia es una manera de "apuntar" o "dirigirse" al documento
    updateDoc(docRef, featuredData)  // Actualiza el documento con los nuevos datos
    .then(() => {
      this.toastr.success('FeaturedData Updated Successfully!');
    })
  }


}







