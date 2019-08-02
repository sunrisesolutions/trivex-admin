import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const orgAPI = 'https://org.api.trivesg.com';
const eventAPI = 'https://event.api.trivesg.com';
const messagingAPI = 'https://messaging.api.trivesg.com';
const createMember = 'https://person.api.trivesg.com';
const userApi = 'https://user.api.trivesg.com';
/* HEADER */
/* /.HEADER */

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private httpClient: HttpClient) { }

  userInfo(id) {

    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${orgAPI}/individual_members${id}`, httpOptions);
  }


  membersInfo(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${orgAPI}/individual_members${id}`, httpOptions);
  }
  /* Get deliveries */
  getDeliveries(endpoint, page): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${messagingAPI}/deliveries?${endpoint}${page}`, httpOptions);
  }
  /* MEssage API*/
  readDelivery(read, id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.put(`${messagingAPI}${id}`, read, httpOptions);
  }
  /*  OptionSets API */
  optionSetsGet(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${messagingAPI}/option_sets${id}`, httpOptions);
  }
  optionSetsPost(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.post(`${messagingAPI}/option_sets`, body, httpOptions);
  }
  optionSetsPut(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.put(`${messagingAPI}/option_sets/${id}`, body, httpOptions);
  }
  optionSetsDelete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.delete(`${messagingAPI}${id}`, httpOptions);
  }
  /* Message Option API */
  messageOptionsPost(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.post(`${messagingAPI}/message_options`, body, httpOptions);
  }
  messageOptionsPut(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.put(`${messagingAPI}/message_options/${id}`, body, httpOptions);
  }
  messageOptionsDelete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.delete(`${messagingAPI}/message_options/${id}`, httpOptions);
  }
  messageOptionsGet(page) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${messagingAPI}/message_option${page}`, httpOptions);
  }
  /* Manage Person API */

  createInfoMember(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.post(`${createMember}/people`, body, httpOptions);
  }
  EditInfoMember(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.put(`${createMember}/people/${id}`, body, httpOptions);
  }
  DeletePerson(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.delete(`${createMember}/people/${id}`, httpOptions);
  }
  getPersonByUuid(uuid) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${createMember}/people?uuid=${uuid}`, httpOptions);
  }
  /* Individual_Members */
  createMember(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.post(`${orgAPI}/individual_members`, body, httpOptions);
  }
  deleteIndividual(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.delete(`${orgAPI}/individual_members${id}`, httpOptions);
  }
  setAdmin(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.put(`${orgAPI}${id}`, body, httpOptions);
  }
  /* Organizations */
  getOrganisations(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${orgAPI}/organisations${id}`, httpOptions)
  }
  getOrgByUuid(uuid) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${orgAPI}/organisations?uuid=${uuid}`, httpOptions)
  }
  createOrganisations(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.post(`${orgAPI}/organisations`, body, httpOptions)
  }
  editOrganisations(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.put(`${orgAPI}/organisations/${id}`, body, httpOptions)
  }
  deleteOrganisations(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.delete(`${orgAPI}/organisations/${id}`, httpOptions)
  }
  uploadImage(getLogoWriteUrl, upToLogoWriteUrl): Observable<any> {
    /* ======= HEADRER ======= */
    const httpOptions = {
      headers: new HttpHeaders(
        {
          // 'Content-Type': 'image/*',
        }
      )
    };
    /* ======= /.HEADER ====== */
    return this.httpClient.post(getLogoWriteUrl, upToLogoWriteUrl, httpOptions)
  }
  /* USER */
  getUser(paramsFilter) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${userApi}/users${paramsFilter}`, httpOptions)
  }
  getInfoUser(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.get(`${orgAPI}/individual_members/${id}`, httpOptions)
  }
  createUser(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.post(`${userApi}/users`, body, httpOptions)
  }
  editUser(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.put(`${userApi}/users/${id}`, body, httpOptions)
  }
  deleteUser(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.delete(`${userApi}/users/${id}`, httpOptions)
  }
  /* EVENTS API */
  eventGet(route): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.httpClient.get(`${eventAPI}/events${route}`, httpOptions);
  }
  eventPost(body): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.httpClient.post(`${eventAPI}/events`, body, httpOptions);
  }
  eventPut(body, id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.httpClient.put(`${eventAPI}${id}`, body, httpOptions);
  }
  eventDelete(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.httpClient.delete(`${eventAPI}${id}`, httpOptions);
  }
}
