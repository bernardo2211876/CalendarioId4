import { TestBed } from '@angular/core/testing';

import { AprovadorService } from './aprovador.service';

describe('AprovadorService', () => {
  let service: AprovadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprovadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
