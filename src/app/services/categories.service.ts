import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: Firestore, private toastr: ToastrService) { }


  //  saveData es una función asíncrona en Angular que se encarga de guardar datos en una colección específica de Firestore
  async saveData(data: Category) { // La función saveData ahora es async, lo que te permite manejar promesas de manera más sencilla usando await. Esto asegura que el documento se añada correctamente antes de continuar con otras acciones.
    try {
      const categoriesCollection = collection(this.firestore, 'categories'); // Crea/obtiene la colección 'categories' en firestore

      const docRef = await addDoc(categoriesCollection, data);   // Añade el documento a la colección categories creada.
      console.log(docRef)
      this.toastr.success('Data Insert Successfully ..!')


    } catch (e) { //maneja posibles errores
      console.error('Error adding document: ', e);
    }
  }


  // Esta función está diseñada para cargar datos de la colección categories de Firestore y devolver un observable que emite un array de objetos. Cada objeto en el array contiene: el ID del documento y los datos del documento.
  loadData(): Observable<any[]> {
    const categoriesCollection = collection(this.firestore, 'categories'); // Crea/obtiene la colección 'categories' en firestore
    return collectionData(categoriesCollection, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'categories'. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, data }; //return { id, data };: Retorna un nuevo objeto que contiene el id y los data. Se veria de esta forma: [{data: {category: 'hola'} id: "m1VjCvgL6PFXULVTyvKN" }]
      }))
    );
  }



  //Esta función  está diseñada para actualizar un documento específico en una colección de Firestore.
  updateData(id: string, editData: any) {
    const docRef = doc(this.firestore, `categories/${id}`); // Referencia al documento. Esta referencia es una manera de "apuntar" o "dirigirse" al documento
    updateDoc(docRef, editData)  // Actualiza el documento con los nuevos datos
      .then(() => {
        this.toastr.success('Data Updated Successfully!');
      })
      .catch(error => {
        this.toastr.error('Error updating data: ' + error);
      });
  }


  //Esta función  está diseñada para eliminar un documento específico en una colección de Firestore.
  deleteData(id: string) {
    const docRef = doc(this.firestore, `categories/${id}`); // Referencia al documento. Esta referencia es una manera de "apuntar" o "dirigirse" al documento
    deleteDoc(docRef)  // Elimina del documento  los nuevos datos
      .then(() => {
        this.toastr.success('Data Updated Successfully!');
      })
      .catch(error => {
        this.toastr.error('Error updating data: ' + error);
      });
  }
}
