import { ApiService } from './../../services/api.service';
import { NbAccessChecker } from '@nebular/security';
import { Component, OnInit } from '@angular/core';
import { EventForm } from '../../models/event-interface';
@Component({
  selector: 'ngx-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})


export class ManageEventsComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isForm: boolean = false;
  listEvents: Array<EventForm>[] = [];
  formEvent: Array<EventForm>[] = [];
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',

    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      startedAt: {
        title: 'Started At',
        type: 'string',
      },
      endedAt: {
        title: 'Ended At',
        type: 'string',
      },
      timezone: {
        title: 'Timezone',
        type: 'string',
      },
    },
  };



  constructor(public apiService: ApiService, public accessChecker: NbAccessChecker) { }

  ngOnInit() {
    this.getEvents();
  }

  /* Request */
  getEvents() {
    this.apiService.eventGet(``)
      .subscribe(res => {
        this.listEvents = res['hydra:member'];
        // tslint:disable-next-line: no-console
      });
  }
  onEdit(event) {
    console.log(event)
    this.formEvent['id'] = event.data['@id'];
    this.formEvent['name'] = event.data['name'];
    this.formEvent['placeholderStartedAt'] = event.data['startedAt'];
    this.formEvent['placeholderEndedAt'] = event.data['endedAt'];
    this.formEvent['title'] = event.data['title'];
    this.formEvent['subtitle'] = event.data['subtitle'];
    this.formEvent['placeholderTimezone'] = event.data['timezone'];
  }
  editSubmit(event) {
    console.log(event)
    if (window.confirm('Are you sure want to edit?')) {
      const eventPut = {
        'name': event.name,
        'startedAt': event.startedAt,
        'endedAt': event.endedAt,
        'title': event.title,
        'subtitle': event.subtitle,
        'timezone': event.timezone,
      };
      this.apiService.eventPut(eventPut, event['id'])
        .subscribe(res => {
          this.isEdit = false;
          this.isForm = false;
          this.formEvent = [];
          alert('Successfully.!!!');
          this.getEvents();
        }, error => {
          if (error.status === 400) {
            alert(error.error['hydra:description']);
          } else if (error.status === 404) {
            alert(error.error['hydra:description']);
          } else if (error.status === 500) {
            alert(error.error['hydra:description']);
          }
        });
    }
  }
  onDelete(event) {
    console.log(event)
    if (window.confirm('Are you sure want to delete?')) {
      this.apiService.eventDelete(event.data['@id'])
        .subscribe(res => {
          this.getEvents();
        }, error => {
          if (error.status === 400) {
            alert(error.error['hydra:description']);
          } else if (error.status === 404) {
            alert(error.error['hydra:description']);
          } else if (error.status === 500) {
            alert(error.error['hydra:description']);
          }
        });
    }
  }
  onCreate(event) {
    const eventPost = {
      'name': event.name,
      'startedAt': event.startedAt,
      'endedAt': event.endedAt,
      'title': event.title,
      'subtitle': event.subtitle,
      'timezone': event.timezone,
    };
    this.apiService.eventPost(eventPost)
      .subscribe(res => {
        this.formEvent = [];
        alert('Successfully.!!!');
        this.getEvents();
      }, error => {
        if (error.status === 400) {
          alert(error.error['hydra:description']);
        } else if (error.status === 404) {
          alert(error.error['hydra:description']);
        } else if (error.status === 500) {
          alert(error.error['hydra:description']);
        }
      });
  }
  clear() {
    this.isAdd = false;
    this.isEdit = false;
    this.isForm = false;
    this.formEvent = [];
  }
}
