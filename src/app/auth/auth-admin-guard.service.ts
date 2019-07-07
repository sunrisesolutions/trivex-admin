import { Injectable, Output, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { tap, filter, subscribeOn } from 'rxjs/operators';
import { map } from 'leaflet';
import { forEach } from '@angular/router/src/utils/collection';
import { AccessCheckerService } from '../services/access-checker.service'
import { NbAccessChecker } from '@nebular/security';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate, OnInit {
  roles: Array<String>;
  public isAdmin: boolean = false;
  public isOrgAdmin: boolean = false;
  public isUser: boolean = false;

  constructor(public accessChecker: NbAccessChecker, private authService: NbAuthService, private router: Router) {

  }
  ngOnInit() {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            localStorage.clear();
            this.router.navigate(['/auth/login']);
          } else {
            this.authService.onTokenChange()
              .subscribe((token: NbAuthJWTToken) => {
                console.log(token)
                if (token['payload']['roles'].length == 1 || token['payload']['roles'][0] == 'ROLE_USER') {
                  alert('You are not a admin')
                  localStorage.clear();
                  this.router.navigate(['/auth/login'])
                  this.canActivate;
                  return false;
                } else {
                  return true;
                }
              })
          }
        })
      )
  }
}

@Injectable({
  providedIn: 'root'
})
export class isAdminGuardService implements CanActivate {
  constructor(public accessChecker: NbAccessChecker, private authService: NbAuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.accessChecker.isGranted('access_denied', 'get-out')

  }
}
@Injectable({
  providedIn: 'root'
})
export class isOrgAdminGuardService implements CanActivate {
  constructor(public accessChecker: NbAccessChecker, private authService: NbAuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.accessChecker.isGranted('access_denied', 'get-out')

  }

}
