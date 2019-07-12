import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Router } from '@angular/router';


@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            if (token['payload']['roles'].length == 1 && token['payload']['roles'][0] == 'ROLE_USER') {
              alert('is User')
              return token['payload']['roles'][0]
            } else {
              return token['payload']['roles']
            }
          }
        })
      )
  }
}
