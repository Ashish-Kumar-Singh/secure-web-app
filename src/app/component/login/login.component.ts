import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  public login():void{
    this.auth.login(this.email,this.password);
  }

  public signInWithGoogle():void{
    this.auth.googleSignIn();
  }

}
