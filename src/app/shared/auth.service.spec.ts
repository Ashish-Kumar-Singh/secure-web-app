import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

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
  const authSpy = jasmine.createSpyObj('AngularFireAuth', [
    'currentUser','signInWithEmailAndPassword',
    'createUserWithEmailAndPassword', 'onAuthStateChanged',
    'sendPasswordResetEmail', 'signInWithPopup',
    'signOut'
  ])

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AuthService,
        {provide: AngularFireAuth, useValue: authSpy}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should logout a user', () => {
    authSpy.signOut.and.resolveTo(of({}));
    service.logout();
    expect(authSpy.signOut).toHaveBeenCalled();
  })

  it('Should show a popup when google sign in selected', () => {
    authSpy.signInWithPopup.and.resolveTo(of({}));
    service.googleSignIn();
    expect(authSpy.signInWithPopup).toHaveBeenCalled();
    expect(authSpy.signInWithPopup).toHaveBeenCalledWith(new GoogleAuthProvider);
  })

  it('Should call firebase password reset', () => {
    authSpy.sendPasswordResetEmail.and.resolveTo(of({}));
    service.forgotPassword("test@email.com");
    expect(authSpy.sendPasswordResetEmail).toHaveBeenCalled();
    expect(authSpy.sendPasswordResetEmail).toHaveBeenCalledWith("test@email.com");
  })

  it('Should call createUserWithEmailAndPassword when registering new user', () => {
    authSpy.createUserWithEmailAndPassword.and.resolveTo(of({}));
    service.register("test@email.com", "password");
    expect(authSpy.createUserWithEmailAndPassword).toHaveBeenCalled();
    //Should call password encryption before sending the actual request
    expect(authSpy.createUserWithEmailAndPassword).toHaveBeenCalledWith("test@email.com", "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8");
  })

  it('Should call signInWithEmailAndPassword when logging in', () => {
    authSpy.signInWithEmailAndPassword.and.resolveTo(of({}));
    service.login("test@email.com", "password");
    expect(authSpy.signInWithEmailAndPassword).toHaveBeenCalled();
    //Should call password encryption before sending the actual request
    expect(authSpy.signInWithEmailAndPassword).toHaveBeenCalledWith("test@email.com", "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8");
  })
});
