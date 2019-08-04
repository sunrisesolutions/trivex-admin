import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {decodeJwtPayload, NbAuthService} from '@nebular/auth';
import {NbAccessChecker} from '@nebular/security';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messagesSource: Array<any>[] = [];

  constructor(public apiService: ApiService
    , public authService: NbAuthService
    , public accessChecker: NbAccessChecker
    , public router: Router) {

  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    actions: {
      custom: [
        {
          name: 'List Messages',
          title: '<i class="custom-list nb-list"></i>',
        },
      ],
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
    pager: {
      perPage: 20,
    },
  };

  ngOnInit() {
    this.getMessages();
  }


  getMessages() {
    this.apiService.messagesGet('')
      .subscribe(res => {
        this.messagesSource = res['hydra:member'];
        console.log(res);
      });
  }


  createMessage(event) {
    const decoded = decodeJwtPayload(localStorage.getItem('token'));
    const optionPost = {
      'name': event.newData.name,
      'organisationUuid': decoded.org,
    };
    this.apiService.messagesPost(optionPost)
      .subscribe(res => {
        event.confirm.resolve();
      }, error => {
        if (error.status === 400) {
          alert(error.error['hydra:description']);
        } else if (error.status === 404) {
          alert(error.error['hydra:description']);
        } else if (error.status === 500) {
          alert(error.error['hydra:description']);
        }
        event.confirm.reject();
      });
  }

  deleteMessage(event) {
    if (window.confirm('Are you sure want to delete? ?')) {
      this.apiService.messagesDelete(event.data['@id'])
        .subscribe(res => {
          alert('Successfully.!!!');
          event.confirm.resolve();
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

  editMessage(event) {
    const decoded = decodeJwtPayload(localStorage.getItem('token'));
    if (window.confirm('Are you sure edit this ?')) {
      const optionSetsPut = {
        'name': event.newData.name,
        'organisation': decoded.org,
      };
      this.apiService.messagesPut(optionSetsPut, event.data['@id'].match(/\d+/g).map(Number))
        .subscribe(res => {
          event.confirm.resolve();
        }, error => {
          if (error.status === 400) {
            alert(error.error['hydra:description']);
          } else if (error.status === 404) {
            alert(error.error['hydra:description']);
          } else if (error.status === 500) {
            alert(error.error['hydra:description']);
          }
          event.confirm.reject();
        });
    }
  }
}
