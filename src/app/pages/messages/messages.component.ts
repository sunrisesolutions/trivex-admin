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
  optionSetsSource: Array<any>[] = [];

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
          name: 'List Options',
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
      name: {
        title: 'Name',
      },
    },
    pager: {
      perPage: 20,
    },
  };

  ngOnInit() {
    this.getMessageOptions();
  }


  getMessageOptions() {
    this.apiService.optionSetsGet('')
      .subscribe(res => {
        this.optionSetsSource = res['hydra:member'];
        console.log(res);
      });
  }


  createOption(event) {
    const decoded = decodeJwtPayload(localStorage.getItem('token'));
    const optionPost = {
      'name': event.newData.name,
      'organisationUuid': decoded.org,
    };
    this.apiService.optionSetsPost(optionPost)
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

  deleteOption(event) {
    if (window.confirm('Are you sure want to delete? ?')) {
      this.apiService.optionSetsDelete(event.data['@id'])
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

  editOption(event) {
    const decoded = decodeJwtPayload(localStorage.getItem('token'));
    if (window.confirm('Are you sure edit this ?')) {
      const optionSetsPut = {
        'name': event.newData.name,
        'organisation': decoded.org,
      };
      this.apiService.optionSetsPut(optionSetsPut, event.data['@id'].match(/\d+/g).map(Number))
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

  customActions(event) {
    console.log(event);
    if (event.action === 'List Options') {
      this.router.navigate([`/pages/list-options/${event.data['@id'].match(/\d+/g).map(Number)}/message-options`]);
    }
  }
}
