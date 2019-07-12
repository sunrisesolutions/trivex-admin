import { NbAuthService } from '@nebular/auth';
import { DatepickerComponent } from './../../forms/datepicker/datepicker.component';
import { Component, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ApiService } from '../../../services/api.service';
import { userInterface } from '../../../models/userProfile-interface';
import { NbDatepicker } from '@nebular/theme';
import { getLocaleDateTimeFormat } from '@angular/common';
import { EventEmitter } from 'selenium-webdriver';
import { FormSubmit } from '../../../models/add-edit-member';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    .cursor-pointer{
      cursor: pointer !important;
    }
    :host /deep/ .ng2-smart-actions-title-add a{
      background: #F98096 !important;
    }
  `],
})
export class SmartTableComponent implements OnInit {
  formMember: Array<FormSubmit>[] = [];
  /* Property */
  isAdd: boolean = false;
  isEdit: boolean = false;
  goForm: boolean = false;
  /* /.Property */
  settings = {
    mode: 'external',
    add: {
      addButtonContent: `<i id="add" class="nb-plus text-light"></i>`,
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
        type: 'string',

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

  source: LocalDataSource = new LocalDataSource();
  members: Array<userInterface>[] = [];
  constructor(private service: SmartTableData, private authService: NbAuthService, private apiService: ApiService) {

  }

  ngOnInit() {
    this.membersInfo();
  }

  membersInfo() {
    this.apiService.getOrganisations(`/${1}/individual_members`)
      .subscribe(info => {
        this.members = info['hydra:member'];
        for (let i = 0; i < this.members.length; i++) {
          this.members[i]['name'] = (!this.members[i]['personData'].name) ? null : this.members[i]['personData'].name;
          this.members[i]['jobTitle'] = (!this.members[i]['personData'].jobTitle) ? null : this.members[i]['personData'].jobTitle;
          this.members[i]['email'] = (!this.members[i]['personData'].email) ? null : this.members[i]['personData'].email;
          this.members[i]['age'] = (!this.members[i]['personData'].age) ? null : this.members[i]['personData'].age;
          this.members[i]['nric'] = (!this.members[i]['personData'].nric) ? null : this.members[i]['personData'].nric;
          this.members[i]['dob'] = (!this.members[i]['personData'].dob) ? null : this.members[i]['personData'].dob;
          this.members[i]['phoneNumber'] = (!this.members[i]['personData'].phone) ? null : this.members[i]['personData'].phone;
        }
        console.log(this.members)
      })
  }
  onCreate(event): void {
    this.goForm = true;
    this.isAdd = true;
    console.log(event)
  }

  onEdit(event): void {
    this.goForm = true;
    this.isEdit = true;

    this.formMember['id'] = event.data['@id'];
    this.formMember['name'] = event.data['name'];
    this.formMember['dob'] = event.data['dob'];
    this.formMember['email'] = event.data['email'];
    this.formMember['job'] = event.data['jobTitle'];
    this.formMember['nric'] = event.data['nric'];
    this.formMember['phoneNumber'] = event.data['phoneNumber'];
  }

  onDeleteConfirm(event): void {
    console.log(event)
    if (window.confirm('Are you sure you want to delete?')) {
      let idDelete = event.data['@id'];
      if (idDelete) {
        idDelete = idDelete.match(/\d+/g).map(Number);
        this.apiService.deleteIndividual(`/${idDelete}`)
          .subscribe(res => {
            console.log('complete')
            this.membersInfo();
          }, err => {
            if (err === '404') {
              alert('Something went wrong.!!!');
            }
          })
      }
    }
  }

  clear() {
    this.goForm = false;
    this.isAdd = false;
    this.isEdit = false;
    this.formMember = [];
  }

  /* Submit */
  createSubmit(form) {
    let org;
    this.authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        org = token['payload'].org;
      }
    })
    console.log(form)
    let mainDate;
    if (form['dob']) {
      mainDate = `${form['dob']['_i'][0]}-0${form['dob']['_i'][1]}-${form['dob']['_i'][2]}`.toLocaleString();
    }
    let body = {
      "birthDate": (mainDate) ? mainDate : null,
      "givenName": (form['name']) ? form['name'] : "",
      "email": (form['email']) ? form['email'] : null,
      "phoneNumber": (form['phoneNumber']) ? form['phoneNumber'] : "",
      "nationalities": (form['nric']) ? [
        {
          "nricNumber": (form['nric']) ? form['nric'] : null
        }
      ] : [],


    }
    setTimeout(() => {
      this.apiService.createInfoMember(body)
        .subscribe(res => {
          console.log(res)
          let bodyIndividual = {
            "personUuid": res['uuid'],
            "organisationUuid": org,

          }
          this.apiService.createMember(bodyIndividual)
            .subscribe(res => {
              console.log(res);
              this.membersInfo();
              this.formMember = [];
              alert('Complete.!!!')
            }, err => {
              if (err.status === 404) {
                alert("Can't create member now.");
              } else if (err.status === 400) {
                alert("Can't create member now.");
              } else if (err.status === 500) {
                alert("Server error.!!!")
              }

            })
        }, err => {
          if (err.status === 404) {
            alert("Can't create member now.");
          } else if (err.status === 400) {
            alert("Can't create member now.");
          } else if (err.status === 500) {
            alert("Server error.!!!")
          }
        })
    },200)

    /* /.Submit */
  }
  editSubmit(form) {
    if (window.confirm('Are you sure you want to edit?')) {
      console.log(form)
      let mainDate;
      if (form['dob']) {
        mainDate = `${form['dob']['_i'][0]}-0${form['dob']['_i'][1]}-${form['dob']['_i'][2]}`.toLocaleString();
      }
      let id = form['id'];
      id = id.match(/\d+/g).map(Number);
      let body = {
        "birthDate": (mainDate) ? mainDate : null,
        "givenName": (form['name']) ? form['name'] : "",
        "email": (form['email']) ? form['email'] : null,
        "phoneNumber": (form['phoneNumber']) ? form['phoneNumber'] : "",
        "nationalities": (form['nric']) ? [
          {
            "nricNumber": (form['nric']) ? form['nric'] : null
          }
        ] : [],
      }
      this.apiService.EditInfoMember(body, id)
        .subscribe(res => {
          console.log(res);
          this.formMember = [];
          this.goForm = false;
          this.isEdit = false;
        }, err => {
          if (err.status === 404) {
            alert("Can't edit member now.");
          } else if (err.status === 400) {
            alert("Can't edit member now.");
          } else if (err.status === 500) {
            alert("Server error.!!!")
          }

        })
    }
  }
};
// -------------------------


