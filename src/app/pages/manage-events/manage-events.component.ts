import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})
export class ManageEventsComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,

    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'Number',

      },
      jobTitle: {
        title: 'Job',
        type: 'string',

      },
      dob: {
        title: 'D.O.B',
        type: 'text',
        /*  editor: {
           type: 'custom',
           component: SmartTableDatepickerRenderComponent,
           config: {
             placeholder: 'yyyy-MM-dd',
           }
         }, */
      },
      nric: {
        title: 'NRIC/ID Number',
        type: 'string'
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'number'
      },

      email: {
        title: 'E-mail',
        type: 'string',

      },

    },
  };

  listEvents;


  constructor() { }

  ngOnInit() {
  }
  /* Request */
  onEdit(event){

  }
  onDelete(event){

  }
  onCreate(event){

  }
}
