import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewClassLevelComponent} from './view-class-level.component';

describe('SaveClassComponent', () => {
  let component: ViewClassLevelComponent;
  let fixture: ComponentFixture<ViewClassLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewClassLevelComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
