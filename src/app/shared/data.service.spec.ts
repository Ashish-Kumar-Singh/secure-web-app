import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('DataService', () => {
  let service: DataService;

  const returnMockData = {
    data:'test'
  }
  
  const dataSpy = jasmine.createSpyObj({
    valueChanges: of(returnMockData)
  })
  
  const fireStoreSpy = jasmine.createSpyObj('AngularFirestore', {
    collection: dataSpy
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        DataService,
        {provide: AngularFirestore, useValue: fireStoreSpy}
      ]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
