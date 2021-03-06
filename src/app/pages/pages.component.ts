import {Component} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {NbAccessChecker} from '@nebular/security';
import {NbAuthService} from '@nebular/auth';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="getMenu(roles)"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  roles: Array<String>;
<<<<<<< HEAD
  menu: Array<any> = [
    {
      title: 'Home',
      icon: 'nb-home',
      link: '/pages/home',
      home: true,
    }, {
      title: 'Manage-Events',
      icon: 'nb-paper-plane',
      expanded: true,
      children: [
        { title: 'Events', link: '/pages/manage-events' },
      ],
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
      title: 'Message Options',
      icon: 'nb-email',
      link: '/pages/list-options',
    },
    {
      title: 'Configuration',
      icon: 'nb-gear',
      expanded: true,
      children: [
        {
          title: 'Organisation Info',
          link: '/pages/organisations',
        },
      ],
    }];;
=======

>>>>>>> 6d8f4af0250cc218c24c26fae3a9c3e56ee6463d
  constructor(private authService: NbAuthService, public accessChecker: NbAccessChecker) {
    this.roles = ['ROLE_USER'];
    this.authService.getToken()
      .subscribe((token) => {
        if (token.isValid()) {
          this.roles = token['payload']['roles'];
          // this.getMenu(token.getPayload()['roles']);
        }
      });

  }

  getMenu(roles) {
    if (roles) {
      if (roles.indexOf('ROLE_ADMIN') > -1) {
        return this.menu = this.adminMenu;
      }
      if (roles.indexOf('ROLE_ORG_ADMIN') > -1) {
        return this.menu;
      }
    }

  }
<<<<<<< HEAD
=======

  orgAdminMenu: Array<any> = [{
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/home',
    home: true,
  }, {
    title: 'Manage-Events',
    icon: 'nb-paper-plane',
    expanded: true,
    children: [
      {title: 'Events', link: '/pages/manage-events'},
    ],
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
      title: 'Message Options',
      icon: 'nb-email',
      link: '/pages/list-options',
    },
    {
      title: 'Messages',
      icon: 'nb-email',
      link: '/pages/messages',
    },
    {
      title: 'Configuration',
      icon: 'nb-gear',
      expanded: true,
      children: [
        {
          title: 'Organisation Info',
          link: '/pages/organisations',
        },
      ],
    }];

>>>>>>> 6d8f4af0250cc218c24c26fae3a9c3e56ee6463d
  adminMenu: Array<any> = [
     {
       title: 'Home',
       icon: 'nb-home',
       link: '/pages/home',
       home: true,
     },
    {
      title: 'Organisations',
      icon: 'nb-flame-circled',
      link: '/pages/organisations',
    },
  ];

  getOut() {
    localStorage.clear();
    return window.location.href = 'https://trivesg.com/login';
  }

}
