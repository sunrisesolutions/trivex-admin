import {MessageOptionsComponent} from './message-options/message-options.component';
import {ListOptionsComponent} from './list-options/list-options.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {OrganisationMembersComponent} from './organizations/organisation-members/organisation-members.component';
import {PagesComponent} from './pages.component';
import {ManageEventsComponent} from './manage-events/manage-events.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {DeliveriesAllComponent} from './deliveries-all/deliveries-all.component';
import {OrganizationsComponent} from './organizations/organizations.component';
import {InfoComponent} from './info/info.component';
import { RegistrationComponent } from './manage-events/registration/registration.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'home',
    component: HomeComponent,
  },
    {
      path: 'deliveries-all',
      component: DeliveriesAllComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'list-options',
      component: ListOptionsComponent,
    },
    {
      path: 'list-options/:id/message-options',
      component: MessageOptionsComponent,
    },
    {
      path: 'ui-features',
      loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
    }, {
      path: 'modal-overlays',
      loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
    }, {
      path: 'extra-components',
      loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
    }, {
      path: 'bootstrap',
      loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
    }, {
      path: 'maps',
      loadChildren: './maps/maps.module#MapsModule',
    }, {
      path: 'charts',
      loadChildren: './charts/charts.module#ChartsModule',
    }, {
      path: 'editors',
      loadChildren: './editors/editors.module#EditorsModule',
    }, {
      path: 'forms',
      loadChildren: './forms/forms.module#FormsModule',
    },
    {
      path: 'info/profile/:id',
      component: InfoComponent,
    },
    {
      path: 'organisations',
      component: OrganizationsComponent,
    },
    {
      path: 'organisations/:id/organisation-members',
      component: OrganisationMembersComponent,
    },
    {
      path: 'manage-events',
      component: ManageEventsComponent,
    },
    {
      path: 'manage-events/:id/registration',
      component: RegistrationComponent
    },
    {
      path: 'manage-members',
      loadChildren: './tables/tables.module#TablesModule',
    }, {
      path: 'miscellaneous',
      loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
    }, {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    }, {
      path: '**',
      component: NotFoundComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
