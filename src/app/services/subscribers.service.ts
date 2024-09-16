import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Toast, ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  // Esta función está diseñada para cargar datos de la colección subcribers de Firestore y devolver un observable que emite un array de objetos. Cada objeto en el array contiene: el ID del documento y los datos del documento. Se va a utilizar en el componente subscribers
  loadData(): Observable<any[]> {
    const categoriesCollection = collection(this.firestore, 'subscribers'); // Crea/obtiene la colección 'subscribers' en firestore
    return collectionData(categoriesCollection, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'categories'. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, data }; //return { id, data }: Retorna un nuevo objeto que contiene el id y los data. Se veria de esta forma: [{id: "Ey1o0Vh1UTR7uL2zYCB6", data:  {name: 'marta', email: 'marta@gmail.com'}}, {id: 'K6vQv0fi0t8uzjD7nYcg', data: {name: 'uri', email: 'uri@gmail.com'}},  ]
      }))
    );
  }


   //Esta función  está diseñada para eliminar un documento específico en una colección de Firestore.
   deleteData(id: string) {
    const docRef = doc(this.firestore, `subscribers/${id}`); // Referencia al documento. Esta referencia es una manera de "apuntar" o "dirigirse" al documento
    deleteDoc(docRef)  // Elimina del documento  los nuevos datos
      .then(() => {
        this.toastr.success('Data Updated Successfully!');
      })
      .catch(error => {
        this.toastr.error('Error updating data: ' + error);
      });
  }
}
