import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent implements OnInit{

  postArray: Post[]= []; //Se veria de esta forma:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}]

  constructor(private postService: PostsService){}


  ngOnInit(): void {
    this.postService.loadData()
      .subscribe(val => {
        console.log(val)
        this.postArray = val;
      });
  }

  onDelete(postImagePath: string, id: string){ //cuando pulsemos el boton delete de la tabla, eliminaremos el post de la Database de Firestore y la imagen del Storage de Firestore
    this.postService.deleteDataAndImage(postImagePath,id)

  }

  onFeatured(id:any, value: boolean) { //onFeatured está diseñado para marcar o desmarcar un post como "destacado" (featured) en la aplicación.
    const featuredData = {
      isFeatured: value
    }
    this.postService.markFeatured(id, featuredData)
  }


}
