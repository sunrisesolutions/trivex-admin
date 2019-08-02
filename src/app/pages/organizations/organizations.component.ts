import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrganisationsForm} from './../../models/add-edit-organisations';
import {ApiService} from './../../services/api.service';
import {Component, OnInit, Output, Input} from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {NbAccessChecker} from '@nebular/security';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent implements OnInit {
  orgInfo: Array<OrganisationsForm>[] = [];
  FormOrg: Array<OrganisationsForm>[] = [];
  goForm: boolean = false;
  orgId;
  /* Filter */
  avaiabledUser: Boolean = false;
  avaiabledEmail: Boolean = false;
  /* /.Filter */
  addAdmin: boolean = false;
  isAdd: boolean = false;
  isEdit: boolean = false;
  settings = {
    mode: 'external',
    actions: {
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
          name: 'ShowMore',
          title: '<i class="custom-show nb-list"></i>',
        },
      ],
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    columns: {
      logoReadUrl: {
        title: 'Logo',
        type: 'html',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          return cell = `
            <div class="container-fluid p-0 d-flex justify-content-center"><img src="${row.logoReadUrl}"></div>
          `;
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
      uuid: {
        title: 'Uuid',
        type: 'string',
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      subdomain: {
        title: 'Subdomain',
        type: 'string',
      },


    },
  };

  constructor(private apiService: ApiService, private http: HttpClient, private authService: NbAuthService, public accessChecker: NbAccessChecker, private router: Router) {

  }

  ngOnInit() {
    this.getOrganisations();
  }


  getOrganisations() {
    this.apiService.getOrganisations('')
      .subscribe(res => {
        this.orgInfo = res['hydra:member'];
        for (const org of this.orgInfo) {
          org['logoReadUrl'] = (org['logoReadUrl'] !== null) ? org['logoReadUrl'] : 'http://ventureasheville.com/wp-content/uploads/2015/09/logo-placeholder.jpg';
        }
        console.log(res);
      });
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
    this.FormOrg['idOrganisation'] = event.data['@id'];
    this.FormOrg['logoName'] = event.data['logoName'];
    this.FormOrg['code'] = event.data['code'];
    this.FormOrg['subdomain'] = event.data['subdomain'];
    console.log(event);

  }

  /* Cretate */
  createOrg(dataInput) {
    dataInput['logoName'] = (<HTMLInputElement>document.getElementById('logo')).files[0];
    dataInput['logoFile'] = (<HTMLInputElement>document.getElementById('logo')).files[0];
    console.log(dataInput);
    const bodyOrganisation = {
      'logoName': (dataInput['logoName']) ? dataInput['logoName'].name : null,
      'address': (dataInput['address']) ? dataInput['address'] : null,
      'name': (dataInput['name']) ? dataInput['name'] : null,
      'code': (dataInput['code']) ? dataInput['code'] : null,
      'subdomain': (dataInput['subdomain']) ? dataInput['subdomain'] : null,
    };
    if (!this.addAdmin) {
      this.apiService.createOrganisations(bodyOrganisation)
        .subscribe(resOrgnisation => {
          /* Up Logo */
          const attributes = resOrgnisation['logoWriteForm']['attributes'];
          const inputs = resOrgnisation['logoWriteForm']['inputs'];
          const formLogoWrite = new FormData;
          formLogoWrite.append('Policy', inputs['Policy']);
          formLogoWrite.append('X-Amz-Algorithm', inputs['X-Amz-Algorithm']);
          formLogoWrite.append('X-Amz-Credential', inputs['X-Amz-Credential']);
          formLogoWrite.append('X-Amz-Date', inputs['X-Amz-Date']);
          formLogoWrite.append('X-Amz-Signature', inputs['X-Amz-Signature']);
          formLogoWrite.append('acl', inputs['acl']);
          formLogoWrite.append('key', resOrgnisation['logoWriteForm']['filePath']);
          formLogoWrite.append('file', dataInput['logoFile']);
          if (dataInput['logoFile']) {
            this.apiService.uploadImage(attributes['action'], formLogoWrite)
              .subscribe(res => {

              });
          }
          alert('Successfully.!!!');
        }, err => {
          if (err.status === 400) {
            alert(err.error['hydra:description']);
            window.stop();
          } else if (err.status === 403) {
            alert(err.error['hydra:description']);
            window.stop();
          } else if (err === 500) {
            alert(err.error['hydra:description']);
            window.stop();
          }
        });
    } else if (this.addAdmin) {
      if (!this.avaiabledEmail && !this.avaiabledUser) {
        this.apiService.createOrganisations(bodyOrganisation)
          .subscribe(resOrgnisation => {
            /* Up Logo */
            console.log('create organisation completed');
            const attributes = resOrgnisation['logoWriteForm']['attributes'];
            const inputs = resOrgnisation['logoWriteForm']['inputs'];
            const formLogoWrite = new FormData;
            formLogoWrite.append('Policy', inputs['Policy']);
            formLogoWrite.append('X-Amz-Algorithm', inputs['X-Amz-Algorithm']);
            formLogoWrite.append('X-Amz-Credential', inputs['X-Amz-Credential']);
            formLogoWrite.append('X-Amz-Date', inputs['X-Amz-Date']);
            formLogoWrite.append('X-Amz-Signature', inputs['X-Amz-Signature']);
            formLogoWrite.append('acl', inputs['acl']);
            formLogoWrite.append('key', resOrgnisation['logoWriteForm']['filePath']);
            formLogoWrite.append('file', dataInput['logoFile']);
            if (dataInput['logoFile']) {
              this.apiService.uploadImage(attributes['action'], formLogoWrite)
                .subscribe(res => {

                });
            }
            this.getOrganisations();
            this.createOrgSubmit(dataInput, resOrgnisation);
          }, err => {
            if (err.status === 400) {
              alert(err.error['hydra:description']);
              window.stop();
            } else if (err.status === 403) {
              alert(err.error['hydra:description']);
              window.stop();
            } else if (err === 500) {
              alert(err.error['hydra:description']);
              window.stop();
            }
          });
      }
    }

  }

  createOrgSubmit(data, getOrganisationId) {
    let mainDate;
    if (data['dob']) {
      mainDate = `${data['dob']['_i'][0]}-0${data['dob']['_i'][1]}-${data['dob']['_i'][2]}`.toLocaleString();
    }
    const bodyPerson = {
      'givenName': (data['nameAdmin']) ? data['nameAdmin'] : null,
      'birthDate': (mainDate) ? mainDate : null,
      'email': (data['email']) ? data['email'] : null,
      'phoneNumber': (data['phoneNumber']) ? data['phoneNumber'] : null,
      'nationalities': [{
        'nricNumber': (data['nric']) ? data['nric'] : null,
      }],
    };
    /* Post to person */

    this.apiService.createInfoMember(bodyPerson)
      .subscribe(res => {
        this.createOrgIndividual(data, res, getOrganisationId);
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
      });

  }

  createOrgIndividual(dataInput, getUuidPerson, getOrganisationId) {
    const bodyIndividual = {
      'personUuid': getUuidPerson['uuid'],
      'organisationUuid': getOrganisationId['uuid'],
      'admin': this.addAdmin,
    };
    // Post to Individual_Members
    this.apiService.createMember(bodyIndividual)
      .subscribe(res => {
      }, err => {
        if (err.status === 400) {
          alert(`${err.error['hydra:description']}`);
          return false;
        } else if (err.status === 403) {
          alert(`${err.error['hydra:description']}`);
          return false;
        } else if (err.status === 500) {
          alert(`The new user was not created. Please contact to admnistrator.`);
          return false;
        }
      }, () => {
        this.createOrgUser(dataInput);
      });

  }

  createOrgUser(dataInput) {
    let mainDate;
    if (dataInput['dob']) {
      mainDate = `${dataInput['dob']['_i'][0]}-0${dataInput['dob']['_i'][1]}-${dataInput['dob']['_i'][2]}`.toLocaleString();
    }

    /* filter user and email */
    /* /.end */

    // if (true) {
    let bodyCreateUser: { plainPassword: any; phone: any; idNumber: any; birthDate: any; email: any; username: any };
    bodyCreateUser = {
      'email': (dataInput['email']) ? dataInput['email'] : null,
      'plainPassword': (dataInput['adminPassword']) ? dataInput['adminPassword'] : null,
      'username': (dataInput['adminUser']) ? dataInput['adminUser'] : null,
      'idNumber': (dataInput['nric']) ? dataInput['nric'] : null,
      'phone': (dataInput['phoneNumber']) ? dataInput['phoneNumber'] : null,
      'birthDate': (mainDate) ? mainDate : null,
    };
    this.apiService.createUser(bodyCreateUser)
      .subscribe(res => {
        this.getOrganisations();
        this.FormOrg = [];
        alert('Completed.!!!');
      }, err => {
        if (err.status === 400) {
          alert(`${err.status}`);
          window.stop();
        } else if (err.status === 403) {
          alert(`${err.status}`);
          window.stop();
        } else if (err.status === 500) {
          alert(`${err.status}`);
          window.stop();
        }
      });
    // }


  }

  /* Edit */
  editOrgSubmit(dataInput) {
    const logoName = (<HTMLInputElement>document.getElementById('logo')).files[0];
    dataInput['logoFile'] = (<HTMLInputElement>document.getElementById('logo')).files[0];
    const bodyOrganisation = {
      'logoName': (logoName) ? logoName.name : dataInput['logoName'],
      'address': (dataInput['address']) ? dataInput['address'] : null,
      'name': (dataInput['name']) ? dataInput['name'] : null,
      'code': (dataInput['code']) ? dataInput['code'] : null,
      'subdomain': (dataInput['subdomain']) ? dataInput['subdomain'] : null,
    };
    let idOrganisation = dataInput['idOrganisation'];
    idOrganisation = idOrganisation.match(/\d+/g, '').map(Number);
    this.apiService.editOrganisations(bodyOrganisation, idOrganisation)
      .subscribe(res => {
        /* Up Logo */

        console.log('edit organisation completed');
        const attributes = res['logoWriteForm']['attributes'];
        const inputs = res['logoWriteForm']['inputs'];
        const formLogoWrite = new FormData;
        formLogoWrite.append('Policy', inputs['Policy']);
        formLogoWrite.append('X-Amz-Algorithm', inputs['X-Amz-Algorithm']);
        formLogoWrite.append('X-Amz-Credential', inputs['X-Amz-Credential']);
        formLogoWrite.append('X-Amz-Date', inputs['X-Amz-Date']);
        formLogoWrite.append('X-Amz-Signature', inputs['X-Amz-Signature']);
        formLogoWrite.append('acl', inputs['acl']);
        formLogoWrite.append('key', res['logoWriteForm']['filePath']);
        formLogoWrite.append('file', dataInput['logoFile']);
        if (dataInput['logoFile']) {
          this.apiService.uploadImage(attributes['action'], formLogoWrite)
            .subscribe(res => {
              this.getOrganisations();
              this.goForm = false;
              this.isEdit = false;
            });
        }
        this.FormOrg = [];
        this.getOrganisations();
        this.goForm = false;
        this.isEdit = false;
      });
  }

  /* Delete */
  deleteOrgSubmit(event) {
    if (window.confirm('Are you sure want to delete this?')) {
      let id = event.data['@id'];
      id = id.match(/\d+/g, '').map(Number);
      this.apiService.deleteOrganisations(id)
        .subscribe(res => {
          alert('Deleted.!!!');
          this.getOrganisations();
        });
    }
  }

  /* /.Request */
  clear() {
    this.goForm = false;
    this.isAdd = false;
    this.isEdit = false;
    this.FormOrg = [];
    this.addAdmin = false;
  }

  showFormAdmin() {
    this.addAdmin = !this.addAdmin;
  }

  customButton(event) {
    if (event.action === 'Edit') {
      this.edit(event);
    } else if (event.action === 'Delete') {
      this.deleteOrgSubmit(event);
    } else if (event.action === 'ShowMore') {
      let idOrg = event.data['@id'];
      idOrg = idOrg.match(/\d+/g, '').map(Number);
      this.router.navigate([`/pages/organisations/${idOrg}/organisation-members`]);
    }
  }


  filter(dataInput) {
    let FilterapiUsername;
    let FilterapiEmail;
    this.apiService.getUser(`?username=${dataInput['adminUser']}`)
      .subscribe(userCallback => {
        if (userCallback['hydra:member'][0]) {
          FilterapiUsername = userCallback['hydra:member'][0]['username'];
          this.avaiabledUser = true;
        } else {
          this.avaiabledUser = false;
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
      });
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
      });
  }
}
