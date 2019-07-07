import { AuthAdminGuardService } from './../../auth/auth-admin-guard.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { AccessCheckerService } from '../../services/access-checker.service';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  username: string;
  strategy = 'username';
  ngOnInit() {
  }
}
export class T {

}
