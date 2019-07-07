import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableDatepickerRenderComponent, } from '../smart-table-datepicker-render/smart-table-datepicker-render.component';
import { ManageEventsComponent } from '../manage-events/manage-events.component';

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    SmartTableDatepickerRenderComponent,
  ],
  providers: [
  ],
  exports: [
    SmartTableDatepickerRenderComponent,

  ],
  entryComponents: [SmartTableDatepickerRenderComponent]
})
export class TablesModule { }
