import { Component, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public accessChecker: NbAccessChecker) { }

  ngOnInit() {
  }

}
