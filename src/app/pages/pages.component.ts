import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbAccessChecker } from '@nebular/security';
import { NbAuthService } from '@nebular/auth';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="getMenu()"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  roles:Array<String>;
  constructor(private authService: NbAuthService) {
    this.roles = ['ROLE_USER'];
    this.authService.onTokenChange()
      .subscribe((token) => {
        if (token.isValid()) {
          this.roles = token['payload']['roles'];
        }
      })

  }

  getMenu(){
    if(this.roles.indexOf('ROLE_ADMIN')>-1){
      return this.adminMenu;
    }
    if(this.roles.indexOf('ROLE_ORG_ADMIN')>-1){
      return this.orgAdminMenu;
    }

  }

  orgAdminMenu = [{
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/home',
    home: true,
  }, {
    title: 'Manage-Events',
    icon: 'nb-paper-plane',
    expanded: true,
    children: [
      { title: 'Events', link: '/pages/manage-events' }
    ]
  },
  {
    title: 'Manage-Members',
    icon: 'nb-person',
    expanded: true,
    children: [
      {
        title: 'Members',
        link: '/pages/manage-members/members',
      },
    ],
  },
  {
    title: 'Configuration',
    icon: 'nb-gear',
    expanded: true,
    children: [
      { title: 'ComingSoon' }
    ],
  }]

  adminMenu = [
    { title: 'Organisations', icon: 'nb-flame-circled', link: '/pages/organisations' }
  ];
  getOut() {
    localStorage.clear();
    return window.location.href = 'https://trivesg.com/login';
  }

}
