import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('AuthService', () => {
  let service: AuthService;

  const returnMockData = {
    data:'test'
  }

  const dataSpy = jasmine.createSpyObj({
    valueChanges: of(returnMockData)
  })
  
  const fireStoreSpy = jasmine.createSpyObj('AngularFireAuth', {
    currentUser: dataSpy
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AuthService,
        {provide: AngularFireAuth, useValue: fireStoreSpy}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
