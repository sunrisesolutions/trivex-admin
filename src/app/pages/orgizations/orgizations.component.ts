import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrganisationsForm } from './../../models/add-edit-organisations';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-orgizations',
  templateUrl: './orgizations.component.html',
  styleUrls: ['./orgizations.component.scss']
})
export class OrgizationsComponent implements OnInit {
  orgInfo: Array<OrganisationsForm>[] = [];
  FormOrg: Array<OrganisationsForm>[] = [];
  goForm: boolean = false;
  orgId;
  isAdd: boolean = false;
  isEdit: boolean = false;
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
      logoReadUrl: {
        title: 'Logo',
        type: 'html',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          return cell = `
            <div class="container-fluid p-0 d-flex justify-content-center"><img src="${row.logoReadUrl}"></div>
          `
        },
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',

      },
      email: {
        title: 'Email',
        type: 'string'
      },
      dob: {
        title: 'D.O.B',
        type: 'string',
      },
      nric: {
        title: 'NRIC/ID Number',
        type: 'string'
      },
      userNameAdmin: {
        title: 'User Name Admin',
        type: 'string',
      },
      passwordAdmin: {
        title: 'Password Admin',
        type: 'string',
      },
      uuid: {
        title: 'uuid',
        type: 'string'
      },

    },
  };
  constructor(private apiService: ApiService, private http: HttpClient, private authService: NbAuthService,public accessChecker: NbAccessChecker) {
    this.authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        this.orgId = token['payload'].org;
      }
    })
  }

  ngOnInit() {
    this.getOrganisations();
  }


  getOrganisations() {
    this.apiService.getOrganisations('')
      .subscribe(res => {
        this.orgInfo = res['hydra:member'];
        for (let org of this.orgInfo) {
          org['logoReadUrl'] = (org['logoReadUrl'] !== null) ? org['logoReadUrl'] : 'http://ventureasheville.com/wp-content/uploads/2015/09/logo-placeholder.jpg';
        }
        console.log(res)
      })
  }

  /* Request */
  create(event) {
    this.goForm = true;
    this.isAdd = true;
  }
  edit(event) {
    this.goForm = true;
    this.isEdit = true;

    this.FormOrg['name'] = event.data['name'];
    this.FormOrg['address'] = event.data['address'];
    this.FormOrg['adminUser'] = event.data['adminUser'];
    this.FormOrg['adminPassword'] = event.data['adminPassword'];

    console.log(event);


  }
  /* Cretate */
  createOrgSubmit(data) {
    let mainDate;
    if (data['dob']) {
      mainDate = `${data['dob']['_i'][0]}-0${data['dob']['_i'][1]}-${data['dob']['_i'][2]}`.toLocaleString();
    }
    let bodyPerson = {
      "givenName": (data['name']) ? data['name'] : null,
      "birthDate": (mainDate) ? mainDate : null,
      "email": (data['email']) ? data['email'] : null,
      "phoneNumber": (data['phoneNumber']) ? data['phoneNumber'] : null,
      "nationalities": [{
        "nricNumber": data['nric'],
      }]
    }
    /* Post to person */
    this.apiService.createInfoMember(bodyPerson)
      .subscribe(res => {
        let bodyIndividual = {
          "personUuid": res['uuid'],
          "organisationUuid": this.orgId
        }
        console.log('createInfo completed')
        // Post to Individual_Members
        this.apiService.createMember(bodyIndividual)
          .subscribe(res => {
            data['logoName'] = (<HTMLInputElement>document.getElementById("logo")).files[0];
            data['logoFile'] = (<HTMLInputElement>document.getElementById("logo")).files[0];
            let bodyOrganisation = {
              "logoName": (data['logoName'].name) ? data['logoName'].name : null,
              "address": (data['address']) ? data['address'] : null,
              "name": (data['name']) ? data['name'] : null,
            }
            this.apiService.createOrganisations(bodyOrganisation)
              .subscribe(res => {
                /* Up Logo */
                console.log('create organisation completed')
                let attributes = res['logoWriteForm']['attributes'];
                let inputs = res['logoWriteForm']['inputs'];
                let formLogoWrite = new FormData;
                formLogoWrite.append('Policy', inputs['Policy']);
                formLogoWrite.append('X-Amz-Algorithm', inputs['X-Amz-Algorithm']);
                formLogoWrite.append('X-Amz-Credential', inputs['X-Amz-Credential']);
                formLogoWrite.append('X-Amz-Date', inputs['X-Amz-Date']);
                formLogoWrite.append('X-Amz-Signature', inputs['X-Amz-Signature']);
                formLogoWrite.append('acl', inputs['acl']);
                formLogoWrite.append('key', res['logoWriteForm']['filePath']);
                formLogoWrite.append('file', data['logoFile'])
                if (data['logoFile']) {
                  this.apiService.uploadImage(attributes['action'], formLogoWrite)
                    .subscribe(res => {
                      console.log('Upload image completed');
                    })
                }
                /* /.Up Logo */
                /* Post to user */
                let bodyCreateUser = {
                  "email":(data['email']) ? data['email'] : null,
                  "plainPassword":(data['adminPassword']) ? data['adminPassword'] : null,
                  "idNumber": (data['nric']) ? data['nric'] : null,
                  "phone": (data['phoneNumber']) ? data['phoneNumber'] : null,
                  "birthDate":  (mainDate) ? mainDate : null
                }
                this.apiService.createUser(bodyCreateUser)
                  .subscribe(res=>{
                    this.getOrganisations();
                    this.FormOrg = [];
                    console.log('User Completed',res)
                  })
              })
          })
      })
    console.log(data)

  }
  /* Edit */
  editOrgSubmit(event) {
    let logoTag = (<HTMLInputElement>document.getElementById("logo")).files;
    let logo;
    if (logoTag.length !== 0) {
      logo = logoTag[0].name;
    }

    console.log(event);
    /*  let body = {
       "logoWriteUrl": (logo) ? logo : null,
       "address": event.newData['address'],
       "name": event.newData['name'],
     }
     let id = event.data['@id']
     id = id.match(/\d+/g, '').map(Number);
     this.apiService.editOrganisations(body, id)
       .subscribe(res => {
         console.log(res);
         this.getOrganisations();
       }, err => {
         if (err.status == 404) {
           alert('Organisation invalid.!!!')
         } else if (err.status == 500) {
           alert('Server error.!!!')
         }
       }) */
  }
  /* Delete */
  deleteOrgSubmit(event) {
    if (window.confirm('Are you want delete?')) {
      let id = event.data['@id']
      id = id.match(/\d+/g, '').map(Number);
      this.apiService.deleteOrganisations(id)
        .subscribe(res => {
          alert('Deleted.!!!');
          this.getOrganisations();
        })
    }
  }
  /* /.Request */
  clear() {
    this.goForm = false;
    this.isAdd = false;
    this.isEdit = false;
    this.FormOrg = [];
  }
}
