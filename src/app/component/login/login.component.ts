import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public email: string = '';
  public password: string = '';
  public isEmailError: boolean = false;
  public isPasswordError: boolean = false;
  public message:string = '';

  constructor(private auth:AuthService, private utils: Utils) { }

  public login():void{
    if (this.validateLogin()) {
      this.auth.login(this.email,this.password);
      this.auth.isLoginError()?.subscribe(error => {
        console.warn("Invalid Username/Password");
        this.message = "Invalid Username/Password"});
  } else {
    this.message = "Invalid Username/Password";
    console.error("Email or Password Invalid");
  }
  }

  public validateLogin(): boolean{
    return (this.utils.isValidEmail(this.email))
  }

  public signInWithGoogle():void{
    this.auth.googleSignIn();
  }

}
