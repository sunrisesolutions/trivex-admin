import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { OrganisationsForm } from '../../../models/add-edit-organisations';
import { MemberOrgInfo } from '../../../models/add-edit-organisation-members';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-organisation-members',
  templateUrl: './organisation-members.component.html',
  styleUrls: ['./organisation-members.component.scss'],
})
export class OrganisationMembersComponent implements OnInit {
  ArrayPersonData: Array<MemberOrgInfo>[] = [];
  FormOrgMembers: Array<OrganisationsForm>[] = [];
  goForm: boolean = false;
  isAdd: boolean = false;
  isEdit: boolean = false;
  isAdmin: boolean = false;
  orgId;
  uuidOrg;
  avaiabledEmail: boolean = false;
  avaiabledUser: boolean = false;
  org = {};
  statusAdmin: boolean = false;
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'Edit',
          title: '<i class="custom-edit nb-edit"></i>',
        },
        {
          name: 'Delete',
          title: '<i class="custom-delete nb-trash"></i>',
        },
        {
          name: 'Admin',
          title: `
            <i class="custom-admin-disable cursor-pointer  nb-power"></i>
          `,

        },
      ],
    },
    /* edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    }, */
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      userName: {
        title: 'User Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',

      },
      jobTitle: {
        title: 'Job',
        type: 'string',
      },
      nric: {
        title: 'NRIC/ID Number',
        type: 'string',
      },
      phone: {
        title: 'Phone Number',
        type: 'string',
      },
      admin: {
        name: 'Admin',
        title: 'Administrator',
        type: 'html',
        filter: false,
        valuePrepareFunction: (cell, rows) => {
          return `
            <div class="ng-star-inserted admin-custom">
              <a class="display-5">
                <i class="${rows['admin'] === true ? 'nb-checkmark-circle custom-admin-active' : ''}"></i>
              </a>
            </div>
          `;
        },
      },
    },
  };
  // tslint:disable-next-line: max-line-length
  constructor(public _sanitizer: DomSanitizer, public apiService: ApiService, public routes: ActivatedRoute, public http: HttpClient, public authService: NbAuthService, public accessChecker: NbAccessChecker, public router: Router) {
  }

  ngOnInit() {
    this.getMembers();
    this.getOrganisation();

  }


  getOrganisation() {
    const idOrgani = +this.routes.snapshot.params.id;
    this.apiService.getOrganisations(`/${idOrgani}`)
      .subscribe(res => {
        this.org = res;
        this.uuidOrg = res['uuid'];
      });
  }

  getMembers() {
    const id = this.routes.snapshot.params.id;
    this.apiService.getOrganisations(`/${id}/individual_members`)
      .subscribe(res => {
        this.ArrayPersonData = res['hydra:member'];
        for (const memberInfo of this.ArrayPersonData) {
          memberInfo['name'] = memberInfo['personData']['name'];
          memberInfo['dob'] = memberInfo['personData']['dob'];
          memberInfo['jobTitle'] = memberInfo['personData']['jobTitle'];
          memberInfo['nric'] = memberInfo['personData']['nric'];
          memberInfo['phoneNumber'] = memberInfo['personData']['phone'];
          // this.apiService.getUser(`?email=${memberInfo['personData']['email']}`)
          //   .subscribe(res => {
          //     // memberInfo['userName'] =  /* res[0]['username'] */
          //   })
        }
      });
  }

  createMemberSubmit(data) {
    // tslint:disable-next-line: no-console
    console.log(data);
    let mainDate;
    if (data['dob']) {
      mainDate = `${data['dob']['_i'][0]}-0${data['dob']['_i'][1]}-${data['dob']['_i'][2]}`.toLocaleString();
    }
    const body = {
      'birthDate': (mainDate) ? mainDate : null,
      'givenName': (data['name']) ? data['name'] : '',
      'email': (data['email']) ? data['email'] : null,
      'phoneNumber': (data['phoneNumber']) ? data['phoneNumber'] : '',
      'nationalities': (data['nric']) ? [
        {
          'nricNumber': (data['nric']) ? data['nric'] : null,
        },
      ] : [],


    };
    this.apiService.createInfoMember(body)
      .subscribe(res => {
        // tslint:disable-next-line: no-console
        console.log(res);
        const bodyIndividual = {
          'personUuid': res['uuid'],
          'organisationUuid': this.uuidOrg,
          'admin': (this.isAdmin === true) ? true : false,
        };
        this.apiService.createMember(bodyIndividual)
          .subscribe(res => {
            this.createUser(data);
          }, err => {
            if (err.status === 404) {
              alert('You can’t create a Member right now. Try again later.');
            } else if (err.status === 400) {
              alert('You can’t create a Member right now. Try check your field.');
            } else if (err.status === 500) {
              alert('Server error.!!!');
            }

          });
      }, err => {
        if (err.status === 404) {
          alert('You can’t create a Member right now. Try check your field.');
        } else if (err.status === 400) {
          alert('You can’t create a Member right now. Try check your field.');
        } else if (err.status === 500) {
          alert('Server error.!!!');
        }
      });

    /* /.Submit */
  }

  createUser(dataInput) {
    let dob;
    if (dataInput['dob']) {
      dob = `${dataInput['dob']['_i'][0]}-0${dataInput['dob']['_i'][1]}-${dataInput['dob']['_i'][2]}`.toLocaleString();
    }
    const bodyUser = {
      'email': (dataInput['email']) ? dataInput['email'] : null,
      'plainPassword': (dataInput['userPassword']) ? dataInput['userPassword'] : null,
      'username': (dataInput['userName']) ? dataInput['userName'] : null,
      'phone': (dataInput['phoneNumber']) ? dataInput['phoneNumber'] : null,
      'birhDate': (dob) ? dob : null,
    };
    this.apiService.createUser(bodyUser)
      .subscribe(res => {
        // tslint:disable-next-line: no-console
        this.getMembers();
        this.FormOrgMembers = [];
        this.isAdmin = false;
        console.log('user created', res);
      });
  }

  editMemberSubmit(data) {
    if (window.confirm('Are you sure you want to edit?')) {
      // tslint:disable-next-line: no-console
      console.log(data);
      let mainDate;
      if (data['dob']) {
        mainDate = `${data['dob']['_i'][0]}-0${data['dob']['_i'][1]}-${data['dob']['_i'][2]}`.toLocaleString();
      }
      let id = data['id'];
      id = id.match(/\d+/g).map(Number);
      const body = {
        'birthDate': (mainDate) ? mainDate : null,
        'givenName': (data['name']) ? data['name'] : '',
        'email': (data['email']) ? data['email'] : null,
        'phoneNumber': (data['phoneNumber']) ? data['phoneNumber'] : '',
        'nationalities': (data['nric']) ? [
          {
            'nricNumber': (data['nric']) ? data['nric'] : null,
          },
        ] : [],
      };
      this.apiService.EditInfoMember(body, id)
        .subscribe(res => {
          // tslint:disable-next-line: no-console
          console.log(res);
          this.EditUser;
        }, err => {
          if (err.status === 404) {
            alert('You can’t edit a Member right now. Try check your field.');
          } else if (err.status === 400) {
            alert('You can’t edit a Member right now. Try check your field.');
          } else if (err.status === 500) {
            alert('Server error.!!!');
          }

        });
    }
  }
  EditUser(dataInput) {
    let dob;
    // tslint:disable-next-line: no-console
    console.log(dataInput);
    if (dataInput['dob']) {
      dob = `${dataInput['dob']['_i'][0]}-0${dataInput['dob']['_i'][1]}-${dataInput['dob']['_i'][2]}`.toLocaleString();
    }
    const editBodyUser = {
      'email': (dataInput['email']) ? dataInput['email'] : null,
      'plainPassword': (dataInput['userPassword']) ? dataInput['userPassword'] : null,
      'username': (dataInput['userName']) ? dataInput['userName'] : null,
      'phone': (dataInput['phoneNumber']) ? dataInput['phoneNumber'] : null,
      'birhDate': (dob) ? dob : null,
    };
    this.FormOrgMembers = [];
    this.goForm = false;
    this.isEdit = false;
    // this.apiService.editUser(editBodyUser,)
  }

  clear() {
    this.goForm = false;
    this.isAdd = false;
    this.isEdit = false;
    this.isAdmin = false;
    this.FormOrgMembers = [];
  }
  create(event) {
    this.goForm = true;
    this.isAdd = true;
  }
  edit(event) {
    this.goForm = true;
    this.isEdit = true;


    this.FormOrgMembers['id'] = event.data['@id'];
    this.FormOrgMembers['name'] = event.data['name'];
    this.FormOrgMembers['dob'] = event.data['dob'];
    this.FormOrgMembers['email'] = event.data['email'];
    this.FormOrgMembers['job'] = event.data['jobTitle'];
    this.FormOrgMembers['nric'] = event.data['nric'];
    this.FormOrgMembers['phoneNumber'] = event.data['phoneNumber'];

    // tslint:disable-next-line: no-console
    console.log(event);

  }
  deleteMememberSubmit(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      let idDelete = event.data['@id'];
      if (idDelete) {
        idDelete = idDelete.match(/\d+/g).map(Number);
        this.apiService.deleteIndividual(`/${idDelete}`)
          .subscribe(res => {
            this.getMembers();
          }, err => {
            if (err.status === 404) {
              alert('You can\'t do that at this time. Please contact your Administrator');
            } else if (err.status === 400) {
              alert('You can\'t do that at this time. Please contact your Administrator');
            } else if (err.status === 500) {
              alert('You can\'t do that at this time. Please contact your Administrator');
            }

          });
      }
    }
  }

  setAdmin(event) {
    let setAdmin = {
      "admin":!event.data['admin']
    }

    this.apiService.setAdmin(setAdmin,event.data['@id'])
      .subscribe(res=>{
      },null,()=>{
        return this.getMembers()
      })
  }

  customAction(event) {
    // tslint:disable-next-line: no-console
    if (event.action === 'Edit') {
      this.edit(event);
    } else if (event.action === 'Delete') {
      this.deleteMememberSubmit(event);
    } else if (event.action === 'Admin') {
      this.isAdmin = !this.isAdmin;
      this.setAdmin(event)
    }
  }
  filter(dataInput) {
    let FilterapiUsername;
    let FilterapiEmail;
    this.apiService.getUser(`?username=${dataInput['userName']}`)
      .subscribe(userCallback => {
        if (userCallback['hydra:member'][0]) {
          FilterapiUsername = userCallback['hydra:member'][0]['userName'];
          this.avaiabledUser = true;
        } else {
          this.avaiabledUser = false;
        }
      }, err => {
        if (err.status === 400) {
          alert(err.error['hydra:description'])
          return false;
        } else if (err.status === 403) {
          alert(err.error['hydra:description'])
          return false;
        } else if (err.status === 500) {
          alert(err.error['hydra:description'])
          return false;
        }
      })
    this.apiService.getUser(`?email=${dataInput['email']}`)
      .subscribe(emailCallback => {
        if (emailCallback['hydra:member'][0]) {
          this.avaiabledEmail = true;
          FilterapiEmail = emailCallback['hydra:member'][0]['email'];
        } else {
          this.avaiabledEmail = false;
        }
      }, err => {
        if (err.status === 400) {
          alert(err.error['hydra:description']);
          return false;
        } else if (err.status === 403) {
          alert(err.error['hydra:description']);
          return false;
        } else if (err.status === 500) {
          alert(err.error['hydra:description']);
          return false;
        }
      })
  }
}

