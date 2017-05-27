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

export class InfoFormComponent{
  scores = [
      '0   Breakdown',
      '10  Angry',
      "20  Sorrowful",
      "30  Upset",
      "40  Anxious",
      "50  Lost",
      "60  So-so",
      "70  Contented",
      "80  Happy",
      "90  Excited",
      "100 Ecstatic"
  ];

  create = false;

  detailPage = false;
    showCreatePage(){
      this.create = true;
  }

  createBackToListPage(){
      this.create = false;
  }

  public eyes : Info[];
  eye:Info = new Info();
  detail:Info = new Info();
  total = 0;
  average = 0;

  constructor(private http: Http){ 
      http.get("/list")
          .map(res => res.json())
          .subscribe(
            v => { 
              this.eyes=v.data;
              this.total=v.total;
              this.average=v.average
            }
          );
  }

  submit(){

      let body = JSON.stringify(this.eye);
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });

      return this.http
      .post('/list', body, options)
      .map(res => res.json())
      .subscribe(
        data => { console.log(data);this.create = false},
        err => { console.log(err); },
        () => { this.http.get("/list")
                .map(res => res.json())
                .subscribe(
                   v => { 
                      console.log(v);
                      this.eyes=v.data;
                      this.total=v.total;
                      this.average=v.average
                   }
                );
              }
      );
     
  }

  goDetail(id){
      this.detailPage = true;
      return this.http
          .get("/detail/" + id)
          .map(res => res.json())
          .subscribe(
            v => { this.detail=v }
          );
  }

  detailBackToListPage(){
      this.detailPage = false;
  }

  
}
