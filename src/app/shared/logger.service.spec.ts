import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('LoggerService', () => {
  let service: LoggerService;

  const angularFirestoreMock = {
    createId:jasmine.createSpy('createId').and.returnValue('id'),
    collection: jasmine.createSpy('collection').and.returnValue({
      add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
      snapshotChanges: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
    }),
    doc: jasmine.createSpy('doc').and.returnValue({
      delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        LoggerService,
        {provide: AngularFirestore, useValue: angularFirestoreMock} 
        
      ]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
