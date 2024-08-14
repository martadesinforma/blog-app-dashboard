import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: Firestore) { }


  //  saveData es una función asíncrona en Angular que se encarga de guardar datos en una colección específica de Firestore
  async saveData(data: any) { // La función saveData ahora es async, lo que te permite manejar promesas de manera más sencilla usando await. Esto asegura que el documento se añada correctamente antes de continuar con otras acciones.
    try {
      const categoriesCollection = collection(this.firestore, 'categories'); // Crea/obtiene la colección 'categories' en firestore

      const docRef = await addDoc(categoriesCollection, data);   // Añade el documento a la colección categories creada.


    } catch (e) { //maneja posibles errores
      console.error('Error adding document: ', e);
    }
  }
}
