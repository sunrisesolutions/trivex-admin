import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbToastrService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken, NbAuthRefreshableToken } from '@nebular/auth';
import { ApiService } from '../../../services/api.service';
import { userInterface } from '../../../models/userProfile-interface';
import { CountUpDirective } from '@swimlane/ngx-charts';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user;
  toastrNotification;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  count;
  countString;
  isOrgAdmin;
  id;
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    public accessChecker: NbAccessChecker,
    private router: Router,
    private authService: NbAuthService,
    private toastrService: NbToastrService,
    private service: ApiService,
    private layoutService: LayoutService) {

    /* Decode token */
    this.authService.onTokenChange()
      .subscribe((token) => {
        if (token.isValid()) {
          localStorage.setItem('token', token['token']) /* SET TOKEN TO LOCAL STORAGE */
          // localStorage.setItem('im_id', token['payload'].im) /* SET IM_ID TO LOCAL STORAGE */
          this.id = token['payload'].im;/* GET IM_ID FROM LOCAL STORAGE */
          this.id = this.id.replace(/\D/g, ''); /* Convert im_id */
          this.service.userInfo(this.id).subscribe(res => {
            this.user = res;
            console.log("info user", res);
          });

        }
      })
  }

  ngOnInit() {
    this.countDeliveries();
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-tag'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title === 'Log out') {
          localStorage.clear(),
            this.router.navigate(['/auth/login'])
        } else if(title === 'Profile'){
          this.router.navigate([`/pages/info/profile/${this.id}`])
        }
      })

  }

  countDeliveries() {
    const endpoint = 'readAt%5Bexists%5D=false&';
    let fakeCount = 0;
    setInterval(() => {
      if (localStorage.getItem('token')) {
        this.service.getDeliveries(endpoint, '')
          .subscribe(res => {
            this.count = res['hydra:totalItems'];
            setTimeout(() => {
              fakeCount = res['hydra:totalItems'];
            },500)
            this.countString = `You have ${this.count} unread messages.!!!`
          }, err => {
            if (err.status === '401') {
              alert('Request error.!!!');
              return false;
            }
          })

      }
      setTimeout(() => {
        if (fakeCount < this.count) {
          this.showToast('top-end','success','nb-notifications')
        }
      }, 500)
    }, 800)

    return this.count;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  showToast(position, status, icon) {
    const endpoint = 'readAt%5Bexists%5D=false&';
    this.service.getDeliveries(endpoint, '')
      .subscribe(res => {
        this.toastrNotification = res['hydra:member'][0];
        this.service.membersInfo(`/${this.toastrNotification['message']['senderId']}`)
          .subscribe(res => {
            this.toastrNotification['sender'] = res['personData'].name;
            console.log(this.toastrNotification);
            setTimeout(() => {
              if (this.toastrNotification) {
                this.toastrService.success(this.toastrNotification['message'].subject, this.toastrNotification['sender'], { position, status, icon, destroyByClick: true, duration: 15000 })
              }
            }, 50)
          })
      })

  }
}
