import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categoryArray: any[] = [];
  formCategory: string = '';
  formStatus: string = 'Add';
  categoryId: string = '';

  constructor(private categoryService: CategoriesService) { }



  ngOnInit(): void { //La función loadData se utiliza para obtener datos de Firestore y estos datos a menudo son necesarios para que el componente funcione correctamente. Al llamar a loadData en ngOnInit, aseguras que estos datos estén disponibles tan pronto como el componente se inicializa.
    this.categoryService.loadData()
      .subscribe(val => {
        console.log(val) //val es [{...}, {...}] donde cada objeto luce: 0: {id: '0cDRegpVFytwJyZbkiTA', data: {category: 'hola'}}}
        this.categoryArray = val;
      })

  }


  onSubmit(formData: NgForm) {   //cuando pulsamos el botón enviar del input, pueden pasar estas cosas:
    let categoryData: Category = {
      category: formData.value.category
    }
    console.log(categoryData) //muestra:  { category: "palabra ingresada por el input del formulario" }

    if (this.formStatus === 'Add') {
      this.categoryService.saveData(categoryData) //hago uso de la función saveData() del servicio CategoriesService pasandole como argumento el objeto categoryData que tiene la clave category donde se almacena el valor que el usuario  ingresa por el input
      formData.reset(); //para que cuando envies la info por el input, el input se limpie
    }

    else if (this.formStatus === 'Edit') {// cuando le demos al boton edit de una de las categorias va a cambiar el status y entonces vamos a poder modificar este valor. El valor de la categoria va a aparecer en el input despues de que hayamos pulsado el boton edit y entonces vamos a poder modificar ese input escribiendo otra cosa y cuando pulsemos el boton edit category, se va a actualizar el nuevo valor en category.
      this.categoryService.updateData(this.categoryId, categoryData)
      formData.reset(); //para que cuando envies la info por el input, el input se limpie
      this.formStatus = 'Add'; //para que cuando termine de actulizar la category, el formulario vuelva a tener el statu de Add y se vuelva a agregar el valor que se ingresa por el input en la base de datos de Firestore en vez de actualizar una category con el valor del input. Se volverá a actualizar una category con el valor del input cuando previamente hayas pulsado el boton de edit.
    }



  }


  onEdit(category: any, id: string) {
    this.formCategory = category; //cuando demos al boton edit, el input se va a rellenar con el valor que category en la fila en la que se encuentra el edit que hemos pulsado
    this.categoryId = id;
    this.formStatus = 'Edit';
  }

  onDelete(id: string){ //cuando pulsemos el boton delete de la tabla, eliminaremos la category de la misma fila donde se encuentra el boton delete de la base de datos de Firestore
    this.categoryService.deleteData(id)
  }

}


