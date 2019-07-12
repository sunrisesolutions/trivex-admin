/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbAuthService, decodeJwtPayload, NbAuthToken, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { environment } from '../environments/environment.prod';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private access: NbAccessChecker, private router: Router, private analytics: AnalyticsService, private authService: NbAuthService) {




    /*   */

  }

  ngOnInit(): void {
    if (environment.production) {
      if (!location.protocol.startsWith("https")) {
        window.location.href = location.href.replace('http', 'https');
      }
    }

    setInterval(() => {
      this.refreshToken();
    },2000)
    this.analytics.trackPageViews();
  }


  refreshToken() {
    // lấy token
    const getToken = localStorage.getItem('token');
    // decode token lấy timestamp
    let decoded;
    this.authService.onTokenChange()
      .subscribe(res => {
        decoded = res['payload'];
      })
    const currentDate = Date.now();
    const tokenDate = decoded.exp * 1000;
    if (tokenDate < currentDate) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else if (localStorage.getItem('token')) {

      /*nếu tokendate trừ cho currentdate nhỏ hơn 600000 thì thực hiện refresh*/
      if (tokenDate - currentDate < 600000) {
        if (localStorage.getItem('refresh_token')) {
          this.authService.refreshToken('username', { "refresh_token": localStorage.getItem('refresh_token') })
            .subscribe(res => {
            }, error => {
              if (error.status === 401) {
                this.router.navigate(['/login']);
              } else if (error.status === 404) {
                this.router.navigate(['/login']);
              } else if (error.status === 405) {
                this.router.navigate(['/login']);
              } else if (error.status === 500) {
                this.router.navigate(['/login']);
              }
            });
        } else {
          this.router.navigate(['/login']);
        }

      }
      /* console.log(
        "2 thoi gian tru cho nhau (sau): ",
        tokenDate - currentDate
      ); */
    }
  }
}
