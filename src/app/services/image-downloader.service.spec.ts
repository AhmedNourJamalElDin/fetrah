import { TestBed } from '@angular/core/testing';

import { ImageDownloaderService } from './image-downloader.service';

describe('ImageDownloaderService', () => {
  let service: ImageDownloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDownloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
