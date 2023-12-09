import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Utils } from 'src/app/shared/utils';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const returnMockData = {
    data:'test'
  }
  const dataSpy = jasmine.createSpyObj({
    valueChanges: of(returnMockData)
  })
  
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
