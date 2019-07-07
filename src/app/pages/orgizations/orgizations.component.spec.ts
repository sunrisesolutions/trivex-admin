import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgizationsComponent } from './orgizations.component';

describe('OrgizationsComponent', () => {
  let component: OrgizationsComponent;
  let fixture: ComponentFixture<OrgizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
