import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  onTitleChanged($event: any){
    const title = $event.target.value; //obtengo el valor de entrada del input
    let permalink = title.replace(/\s/g, '-');//quiero reemplazar los espacios que se pueden escribir cuando ingresas información en el input del título por -. Se utiliza esta es una expresión regular /\s/g para buscar todos los espacios en blanco

    console.log(permalink)

  }

}
