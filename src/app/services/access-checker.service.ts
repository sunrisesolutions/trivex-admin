import { map } from 'leaflet';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AccessCheckerService {
  public isAdmin: boolean = false;
  public isOrgAdmin: boolean = false;
  public isUser: boolean = false;
  roles: Array<String>;

  constructor(private authService: NbAuthService) {
    this.roles = ['ROLE_USER'];
    this.authService.onTokenChange()
      .subscribe((token) => {
        this.roles = token['payload']['roles'];

        if (this.roles.indexOf('ROLE_ADMIN') > -1) {
          return this.isAdmin = true;
        }
        if (this.roles.indexOf('ROLE_ORG_ADMIN') > -1) {
          return this.isOrgAdmin = true;
        }
        if (this.roles.indexOf('ROLE_USER') > -1) {
          return this.isUser = true;
        }
        console.log(this.roles, 'isUser', this.isUser)

      })
  }
}
