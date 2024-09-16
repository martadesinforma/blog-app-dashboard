import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent implements OnInit {

  subscribersArray: Array<any> = []; //subscribersArray se veria de esta forma: [{id: "Ey1o0Vh1UTR7uL2zYCB6", data:  {name: 'marta', email: 'marta@gmail.com'}}, {id: 'K6vQv0fi0t8uzjD7nYcg', data: {name: 'uri', email: 'uri@gmail.com'}},  ]

  constructor(private subscribersSerive: SubscribersService){}

  ngOnInit(): void {
    this.subscribersSerive.loadData()
      .subscribe(val => { //val se veria de esta forma: [{id: "Ey1o0Vh1UTR7uL2zYCB6", data:  {name: 'marta', email: 'marta@gmail.com'}}, {id: 'K6vQv0fi0t8uzjD7nYcg', data: {name: 'uri', email: 'uri@gmail.com'}},  ]
        this.subscribersArray = val;
      })
  }

  onDelete(subscriberId: any){
    this.subscribersSerive.deleteData(subscriberId);
  }

}
