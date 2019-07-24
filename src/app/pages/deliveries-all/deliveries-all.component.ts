import { LocalDataSource } from 'ng2-smart-table';
import { InfiniteScrollerDirective } from '../../directives/infinite-scroller.directive';
import { DeliveriesInterface } from './../../models/deliveries';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, Output, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/do';
// import 'rxjs-compat/add/operator/concat';
@Component({
  selector: 'ngx-deliveries-all',
  templateUrl: './deliveries-all.component.html',
  styleUrls: ['./deliveries-all.component.scss'],
})

export class DeliveriesAllComponent implements OnInit {
  endpoint = 'readAt%5Bexists%5D=false&';
  deliveries: Array<any> = [];
  picture = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif';
  // delivery;
  modalDelivery;
  currentPage = 1;
  scrollCallback;
  count;
  indexDeliveries = 0;
  source;
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
      for (const delivery of this.deliveries) {
        const id = delivery['message'].senderId;
        this.source = delivery;
        delivery.idSender = id;
        delivery.name = 'Waiting...';
        delivery.picture = this.picture;
        this.apiService.membersInfo(`/${id}`)
          .subscribe(response => {
            delivery.name = response['personData'].name;
            delivery.picture = response['profilePicture'];
          });

      }
      console.log(res['hydra:member'])
    });

  }
  open(content, delivery) {
    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true });
    }
    const d = new Date();
    const pramramsRead = {
      'readAt': d.getTimezoneOffset(),
    };
    delivery.readAt = pramramsRead.readAt;
    this.apiService.readDelivery(pramramsRead, delivery['@id']).subscribe(res => {
    });
  }
}
