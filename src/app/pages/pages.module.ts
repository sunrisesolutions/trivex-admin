import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { TablesRoutingModule } from './tables/tables-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HomeComponent } from './home/home.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { DeliveriesAllComponent } from './deliveries-all/deliveries-all.component';
import { InfiniteScrollerDirective } from '../directives/infinite-scroller.directive';
import { SmartTableDatepickerRenderComponent } from './smart-table-datepicker-render/smart-table-datepicker-render.component';
import { NbDatepickerModule } from '@nebular/theme';
import { OrgizationsComponent } from './orgizations/orgizations.component';
import { OrganisationMembersComponent} from './orgizations/organisation-members/organisation-members.component';
import { InfoComponent } from './info/info.component';
import { ListOptionsComponent } from './list-options/list-options.component';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { MessageOptionsComponent } from './message-options/message-options.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    RouterModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    TimezonePickerModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    HomeComponent,
    InfiniteScrollerDirective,
    DeliveriesAllComponent,
    ManageEventsComponent,
    OrgizationsComponent,
    OrganisationMembersComponent,
    InfoComponent,
    ListOptionsComponent,
    MessageOptionsComponent,
  ],
  entryComponents: [
  ],
})
export class PagesModule {
}
