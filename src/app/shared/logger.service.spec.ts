import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('LoggerService', () => {
  let service: LoggerService;

  const firestoreMock = {
    collection: jasmine.createSpy('collection').and.returnValue({
      add: jasmine.createSpy('add').and.returnValue(Promise.resolve())
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        LoggerService,
        {provide: AngularFirestore, useValue: firestoreMock} 
        
      ]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
