import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Review } from '../model/review';

describe('DataService', () => {
  let service: DataService;

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
        DataService,
        {provide: AngularFirestore, useValue: angularFirestoreMock}
      ]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createId and collection when addReview is called', () => {
    service.addReview({} as Review);
    expect(angularFirestoreMock.createId).toHaveBeenCalled();
    expect(angularFirestoreMock.collection().add).toHaveBeenCalled();
    expect(angularFirestoreMock.collection().add).toHaveBeenCalledWith({id:'id'} as Review);
  });

  it('should call collection snapshotChanges when getAllRevews is called', () => {
    service.getAllReviews();
    expect(angularFirestoreMock.collection().snapshotChanges).toHaveBeenCalled();
  });

  it('should call doc delete when deleteReview is called', () => {
    service.deleteReview({} as Review);
    expect(angularFirestoreMock.doc().delete).toHaveBeenCalled();
  });
});
