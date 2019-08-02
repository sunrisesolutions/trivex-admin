import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationMembersComponent } from './organisation-members.component';

describe('OrganisationMembersComponent', () => {
  let component: OrganisationMembersComponent;
  let fixture: ComponentFixture<OrganisationMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
