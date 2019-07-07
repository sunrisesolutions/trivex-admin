import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableDatepickerRenderComponent } from './smart-table-datepicker-render.component';

describe('SmartTableDatepickerRenderComponent', () => {
  let component: SmartTableDatepickerRenderComponent;
  let fixture: ComponentFixture<SmartTableDatepickerRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTableDatepickerRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTableDatepickerRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
