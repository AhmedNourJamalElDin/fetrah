import { TestBed } from '@angular/core/testing';

import { ImagesManipulatorService } from './images-manipulator.service';

describe('ImagesManipulatorService', () => {
  let service: ImagesManipulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesManipulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
