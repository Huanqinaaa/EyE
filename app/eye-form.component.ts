"use strict";
import { Component } from '@angular/core';
import { Info }    from './info';
import { Http } from '@angular/http';
import { Headers , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


 
@Component({
  moduleId: module.id,
  selector: 'info-form',
  templateUrl: './temp/info-form.component.html'
})

export class InfoFormComponent {
  scores = ['0   Breakdown', '10  Angry',"20  Sorrowful","30  Upset","40  Anxious","50  Lost","60  So-so","70  Contented","80  Happy","90  Excited","100 Ecstatic"];

  create = false;
  detailPage = false;
    showCreatePage(){
      this.create = true;
  }

  createBackToListPage(){
      this.create = false;
  }
  constructor(private http: Http){ }

  public eyes : Info[];
  eye:Info = new Info();

  submit(){

      let body = JSON.stringify(this.eye);

        
      let headers = new Headers({'Content-Type': 'application/json'});

      let options = new RequestOptions({ headers: headers });

      return this.http
      .post('/add', body, options)
      .map(res => res.json())
      .subscribe(
        data => { console.log(data); },
        err => { console.log(err); },
        () => { console.log('complete'); this.create = false;}
      );
     
  }

  goDetail(){
    this.detailPage = true;
  }

  detailBackToListPage(){
      this.detailPage = false;
  }
}