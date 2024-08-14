import { Component, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
  }

  async onSubmit(formData: NgForm) { // La función onSubmit ahora es async, lo que te permite manejar promesas de manera más sencilla usando await. Esto asegura que el documento se añada correctamente antes de continuar con otras acciones.

    let categoryData = {
      category: formData.value.category
    }
    console.log(categoryData) //muestra:  { category: "palabra ingresada por el input del formulario" }

    let subCategoryData = {
      subCategory: 'subCategory1'
    }

    let subSubCategoryData = {
      subSubCategory : 'subSubCategory1'
    }

    const categoriesCollection = collection(this.firestore, 'categories'); // Crea/obtiene la colección 'categories' en firestore

    try {
      const docRef = await addDoc(categoriesCollection, categoryData);   // Añade el documento a la colección categories creada.


      //Ahora queremos crear una subcolección dentro de cada  documento de la colección categories:

      const categoryDocRef = doc(this.firestore, `categories/${docRef.id}`);  // Obtiene la referencia al documento recién creado en 'categories'
      const subcategoriesCollection = collection(categoryDocRef, 'subcategories');// Crea/obtiene la subcolección 'subcategories' dentro del documento
      const subRef = await addDoc(subcategoriesCollection, subCategoryData);// Añade un documento a la subcolección 'subcategories'


      //Ahora queremos crear una subsubcolección

      const subCategoryDocRef =doc(this.firestore, `categories/${docRef.id}/subcategories/${subRef.id}`);  // Obtiene la referencia al documento recién creado en 'subcategories'
      const subSubcategoriesCollection = collection(subCategoryDocRef, 'subsubcategories');// Crea/obtiene la subsubcolección 'subsubcategories' dentro del documento
      const subsubref = await addDoc(subSubcategoriesCollection, subSubCategoryData) //Añade un documento a la subsubcolección 'subsubcategories'



    } catch (e) { //maneja posibles errores
      console.error('Error adding document: ', e);
    }

  }

}


