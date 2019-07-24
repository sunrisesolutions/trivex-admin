import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { of as observableOf } from 'rxjs/observable/of';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Router } from '@angular/router';


@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  getRole(): Observable<string> {
    return this.authService.getToken()
      .pipe(
        map((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            if (token.getPayload()['roles'].length === 1 && token['payload']['roles'][0] === 'ROLE_USER') {
              return token['payload']['roles'][0];
            } else {
              // console.log(observableOf(token['payload']['roles']))
              return token.getPayload()['roles'];
              // return observableOf(token['payload']['roles']);
            }
          }
        }),
      );
  }
}
