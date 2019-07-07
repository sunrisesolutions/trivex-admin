import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesAllComponent } from './deliveries-all.component';

describe('DeliveriesAllComponent', () => {
  let component: DeliveriesAllComponent;
  let fixture: ComponentFixture<DeliveriesAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
