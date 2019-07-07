import { FormsModule } from './pages/forms/forms.module';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AuthAdminGuardService } from '../app/auth/auth-admin-guard.service'
import { AuthAdminModule } from '../app/auth/auth-admin/auth-admin.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollerDirective } from './directives/infinite-scroller.directive';
import { NbDatepickerModule } from '@nebular/theme';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthAdminModule,
    FormsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbDatepickerModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthAdminGuardService,
    InfiniteScrollerDirective,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
