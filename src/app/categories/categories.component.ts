import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {}

  onSubmit(formData: NgForm) {

    let categoryData = {
      category: formData.value.category
    }
    console.log(categoryData) //muestra:  { category: "palabra ingresada por el input del formulario" }

    this.categoryService.saveData(categoryData) //hago uso de la función saveData() del servicio CategoriesService pasandole como argumento el objeto categoryData que tiene la clave category donde se almacena el valor que el usuario  ingresa por el input

  }

}


