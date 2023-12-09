import { Component, OnInit } from '@angular/core';
import { pwnedPassword } from 'hibp';
import { AuthService } from 'src/app/shared/auth.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public email: string = '';
  public password: string = '';

  public isEmailValid:boolean = true;

  public isPasswordValid:boolean = true;

  public erorMessage:string ='';

  private isPasswordBreached:boolean = false;

  constructor(private auth:AuthService, private utils: Utils) { }

  ngOnInit(): void {
  }

  private async checkPasswordBreached(password:string):Promise<void>{
    try {
      const numPwns = await pwnedPassword(password);
      // truthy check or numeric condition
      if (numPwns) {
        this.erorMessage = `Please use a stronger password, this password was found breached ${numPwns} times`
      } else if(this.validateRegister()){
        this.isEmailValid= true;
        this.isPasswordValid = true;
        this.erorMessage='';
        this.auth.register(this.email,this.password);
        }
    } catch (err) {
      console.error(err);
    }
  }

  private isValidEmail():void{
    this.isEmailValid = this.utils.isValidEmail(this.email);
  }

  private isValidPassword():void{
    this.isPasswordValid = this.utils.isPasswordCorrect(this.password);
  }

  private validateRegister(): boolean{
    return (this.isEmailValid && this.isPasswordValid)
  }

  public register():void{
    this.isValidEmail();
    this.isValidPassword();
    this.checkPasswordBreached(this.password);
  }

}
