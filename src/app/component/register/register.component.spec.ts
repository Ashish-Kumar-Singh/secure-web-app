import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Utils } from 'src/app/shared/utils';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const authSpy = jasmine.createSpyObj('AuthService', [
    'register'
  ])

  const utilsSpy = jasmine.createSpyObj('Utils', [
    'isValidEmail','isPasswordCorrect'
  ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
       providers: [
        {provide: Utils, useValue: utilsSpy},
        {provide:AuthService, useValue:authSpy}
      ],
      imports:[FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call email and password validation when register is called', () => {
    component.email = "as@as.com"
    component.password = "P@ssword12"
    component.register();
    expect(utilsSpy.isValidEmail).toHaveBeenCalled();
    expect(utilsSpy.isPasswordCorrect).toHaveBeenCalled();
  });
});
