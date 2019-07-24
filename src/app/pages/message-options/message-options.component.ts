import { NbAccessChecker } from '@nebular/security';
import { NbAuthService, decodeJwtPayload } from '@nebular/auth';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-message-options',
  templateUrl: './message-options.component.html',
  styleUrls: ['./message-options.component.scss'],
})
export class MessageOptionsComponent implements OnInit {
  optionSetsSource: Array<any>[] = [];
  optionName = '';
  constructor(
    public apiService: ApiService,
    public authService: NbAuthService,
    public accessChecker: NbAccessChecker,
    public router: Router,
    public route: ActivatedRoute
  ) {

  }

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
    const idOption = +this.route.snapshot.params.id;
    this.apiService.optionSetsGet(`/${idOption}/message_options`)
      .subscribe(res => {
        this.optionSetsSource = res['hydra:member'];
        this.optionName = res['name'];
        console.log(res);
      });
  }


  createMessageOption(event) {
    console.log(event);
    const idOption = +this.route.snapshot.params.id;
    const messageOptionPost = {
      'name': event.newData.name,
      'optionSet': `/option_sets/${idOption}`,
    };

    this.apiService.messageOptionsPost(messageOptionPost)
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

  deleteMessageOption(event) {
    console.log(event);
    if (window.confirm('Are you sure want to delete? ?')) {
      this.apiService.messageOptionsDelete(event.data['@id'].match(/\d+/g).map(Number))
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

  editMessageOption(event) {
    console.log(event);
      const idOption = +this.route.snapshot.params.id;

    const decoded = decodeJwtPayload(localStorage.getItem('token'));
    if (window.confirm('Are you sure edit this ?')) {
      const messageOptionPut = {
        'name': event.newData.name,
        'optionSet': `/option_sets/${idOption}`,
      };
      this.apiService.messageOptionsPut(messageOptionPut, event.data['@id'].match(/\d+/g).map(Number))
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
