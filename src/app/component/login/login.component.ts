import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public isEmailError: boolean = false;
  public isPasswordError: boolean = false;
  public message:string = '';

  constructor(private auth:AuthService, private utils: Utils) { }

  ngOnInit(): void {
  } 

  public login():void{
    if (this.validateLogin()) {
      this.auth.login(this.email,this.password);
      this.auth.isLoginError()?.subscribe(error => {
        this.message = "Invalid Username/Password"});
  } else {
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
