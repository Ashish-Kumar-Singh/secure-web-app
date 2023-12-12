import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Utils } from 'src/app/shared/utils';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  const authSpy = jasmine.createSpyObj('AuthService', [
    'login','isLoginError','googleSignIn'
  ])

  const utilsSpy = jasmine.createSpyObj('Utils', [
    'isValidEmail',
  ])
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: Utils, useValue: utilsSpy},
        {provide:AuthService, useValue:authSpy}
      ],
      imports:[FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    utilsSpy.isValidEmail.and.returnValue(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call googleSign in if Signinwithgoogle is clicked', () => {
    component.signInWithGoogle();
    expect(authSpy.googleSignIn).toHaveBeenCalled();
  });

  it('should return false if email is wrong format', () => {
    utilsSpy.isValidEmail.and.returnValue(false);
    component.email ="as.com"
    const result = component.validateLogin();
    expect(utilsSpy.isValidEmail).toHaveBeenCalledWith("as.com");
    expect(result).toBe(false);
  });

  it('should return true if email is correct format', () => {
    utilsSpy.isValidEmail.and.returnValue(true);
    component.email ="as@gmail.com"
    const result = component.validateLogin();
    expect(utilsSpy.isValidEmail).toHaveBeenCalledWith("as@gmail.com");
    expect(result).toBe(true);
  });

  it('should call login method', () => {
    component.email ="as@gmail.com"
    component.password="password"
    component.login();
    expect(utilsSpy.isValidEmail).toHaveBeenCalledWith("as@gmail.com");
  });

  it('should display error message if login error', () => {
    authSpy.isLoginError.and.returnValue(of(true));
    utilsSpy.isValidEmail.and.returnValue(true);
    component.email ="as@gmail.com"
    component.password="password"
    component.login();
    expect(utilsSpy.isValidEmail).toHaveBeenCalledWith("as@gmail.com");
    expect(component.message).toEqual('Invalid Username/Password');
  });
});
