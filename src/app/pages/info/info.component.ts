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
  constructor(private apiService: ApiService, private routes: ActivatedRoute) { }

  ngOnInit() {
    this.getInfoUser();
  }

  getInfoUser() {
    let id = +this.routes.snapshot.params.id;
    this.apiService.getInfoUser(`${id}`)
      .subscribe(res => {
        this.info = res
      })
  }

}
