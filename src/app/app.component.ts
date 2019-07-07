/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbAuthService, decodeJwtPayload } from '@nebular/auth';
import { Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private access: NbAccessChecker, private router: Router, private analytics: AnalyticsService, private authService: NbAuthService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('refresh_token')) {
      this.authService.refreshToken('username', { "refresh_token": localStorage.getItem('refresh_token') })
        .subscribe(res => {
          console.log(res)
        }, error => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        });
    }
    this.analytics.trackPageViews();
  }
}
