import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell, DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'ngx-smart-table-datepicker-render',
  templateUrl: './smart-table-datepicker-render.component.html',
  styleUrls: ['./smart-table-datepicker-render.component.scss']
})
export class SmartTableDatepickerRenderComponent implements ViewCell,OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    // this.renderValue = this.value.toString().toUpperCase();

    console.log(this.save.emit())
  }

  onClick(row) {
  }
}


