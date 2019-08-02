import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { EventForm } from '../../../models/event-interface';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  listEventRegistration: Array<any>[] = [];
  formEvent: Array<any>[] = [];
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions:{
      edit: false,
      add: false,
      create: false,
      delete: false,
    },
   /*  add: {
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
    }, */
    columns: {
      givenName: {
        title: 'Name',
        type: 'string',
      },
      gender: {
        title: 'Gender',
        type: 'string',
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'string',
      },
      birthDate: {
        title: 'D.O.B',
        type: 'string',
      },
      
    },
  };
  constructor(
    public apiService: ApiService,
    public route: ActivatedRoute,
    public accessChecker: NbAccessChecker
  ) { }

  ngOnInit() {
    this.getEventRegstration();
  }


  getEventRegstration(){
    let id = +this.route.snapshot.params.id;
    this.apiService.eventGet(`/${id}/registrations`)
      .subscribe(res=>{
        this.listEventRegistration = res['hydra:member']
        this.source.load(res['hydra:member'])
        console.log(res)
      })
  }
}
