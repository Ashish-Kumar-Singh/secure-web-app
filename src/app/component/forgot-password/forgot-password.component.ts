import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public email: string= '';

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  public forgotPassword():void{
    this.authService.forgotPassword(this.email);
  }
}
