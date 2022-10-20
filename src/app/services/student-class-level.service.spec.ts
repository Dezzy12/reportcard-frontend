import {TestBed} from '@angular/core/testing';

import {StudentClassLevelService} from './student-class-level.service';

describe('StudentClassLevelService', () => {
  let service: StudentClassLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentClassLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
