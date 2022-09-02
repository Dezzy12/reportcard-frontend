import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAdminComponent } from './admin-view-admin.component';

describe('AdminViewAdminComponent', () => {
  let component: AdminViewAdminComponent;
  let fixture: ComponentFixture<AdminViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
