import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  info;
  constructor(private apiService: ApiService, private routes: ActivatedRoute, public httpClient: HttpClient) { }

  ngOnInit() {
    this.getInfoUser();
  }

  getInfoUser() {
    const id = +this.routes.snapshot.params.id;
    this.apiService.getInfoUser(`${id}`)
      .subscribe(res => {
        this.info = res;
        this.httpClient.get(this.info['profilePicture'])
          .subscribe(res => {

          }, error => {
            if (error.status === 404) {
              this.info['profilePicture'] = 'https://i.gifer.com/B0eS.gif'
            }
          });

      });
  }

}
