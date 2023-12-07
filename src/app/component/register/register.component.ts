import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public email: string = '';
  public password: string = '';

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  public register():void{
    this.auth.register(this.email,this.password);
  }

}
