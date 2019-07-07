import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const orgAPI = "https://org.api.trivesg.com";
const deliveriesAPI = "https://messaging.api.trivesg.com";
const postMessage = "https://messaging.api.trivesg.com";
const createMember = "https://person.api.trivesg.com";
const userApi = "https://user.api.trivesg.com";
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
    return this.httpClient.get(`${orgAPI}/individual_members/${id}`, httpOptions);
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
    return this.httpClient.get(`${deliveriesAPI}/deliveries?${endpoint}${page}`, httpOptions);
  }
  /* Read MEssage */
  readDelivery(read, id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.put(`${postMessage}${id}`, read, httpOptions);
  }

  /* Manage Member API */

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
  createMember(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.post(`${orgAPI}/individual_members`, body, httpOptions);
  }

  deleteUser(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.delete(`${orgAPI}/individual_members${id}`, httpOptions);
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
  createUser(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.httpClient.post(`${userApi}/users`, body, httpOptions)
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
}
