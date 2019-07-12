import { InfiniteScrollerDirective } from '../../directives/infinite-scroller.directive';
import { DeliveriesInterface } from './../../models/deliveries';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/do';
// import 'rxjs-compat/add/operator/concat';
@Component({
  selector: 'ngx-deliveries-all',
  templateUrl: './deliveries-all.component.html',
  styleUrls: ['./deliveries-all.component.scss']
})

export class DeliveriesAllComponent implements OnInit {
  endpoint = 'readAt%5Bexists%5D=false&';
  deliveries: Array<any> = [];
  delivery;
  currentPage = 1;
  scrollCallback;
  count;
  subCount = 0;
  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
  ) {
    this.scrollCallback = this.getDeliveries.bind(this);
  }

  ngOnInit() {
    /* setInterval(() => {
      this.apiService.getDeliveries(this.endpoint, '')
        .subscribe(res => {
          this.count = res['hydra:totalItems'];
          setTimeout(() => {
            this.subCount = this.count;
            if (this.subCount < this.count) {
              this.getDeliveries();
            }
          }, 1000)
        })
    },500) */
  }

  getDeliveries() {

    return this.apiService.getDeliveries('', `page=${this.currentPage}`).do(res => {
      this.currentPage++;
      this.deliveries = this.deliveries.concat(res['hydra:member']);
      for (let delivery of this.deliveries) {
        let id = delivery['message'].senderId;
        delivery.idSender = id;
        delivery.name = 'Waiting...';
        delivery.picture = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif'
        this.apiService.membersInfo(`/${id}`)
          .subscribe(res => {
            let name = res['personData'].name;
            delivery.name = name;
            delivery.picture = res['profilePicture'];
          })

      }
    })

  }
  open(content, delivery) {
    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
      this.delivery = delivery;
    }
    let d = new Date();
    let pramramsRead = {
      "readAt": d.getTimezoneOffset(),
    }
    delivery.readAt = pramramsRead.readAt;
    this.apiService.readDelivery(pramramsRead, delivery['@id']).subscribe(res => {
    })
  }
}
