import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "@angular/fire/auth";
import * as CryptoJS from 'crypto-js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId: string| undefined;

  private loginError:Observable<boolean> = of(false);

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  public getUserId(): void{
    console.log("Rertreiving User Id");
    this.fireauth.currentUser.then(
      user => {
        this.userId = user?.uid;
      }
    )
  }

  public isLoginError():Observable<boolean>{
    return this.loginError;
  }

  private sha1HashPasssword(password:string):string{
    return CryptoJS.SHA1(password).toString();
  }


  public login(email: string, password: string):void{
    this.fireauth.signInWithEmailAndPassword(email, this.sha1HashPasssword(password)).then((result) => {
      if(result.user?.emailVerified){
        this.router.navigate(['dashboard']);
      }
      else{
        this.router.navigate(['/verify']);
      }
    }, error => {
      this.loginError = of(true);
      console.error("Error logging in the user " + error);
      this.router.navigate(['/login']);
    })
  }

  public register(email: string, password: string):void{
    this.fireauth.createUserWithEmailAndPassword(email, this.sha1HashPasssword(password)).then(() => {
      this.sendEmailVerification();
    }, error =>{
      console.error("Error registering the user " + error);
      this.router.navigate(['/register']);
    })
  }

  private sendEmailVerification():void{
    this.fireauth.onAuthStateChanged(user => {
      if(user){
        user.sendEmailVerification().then((result:any) => {
          this.router.navigate(['/verify']);
        }, (error:any) =>{
          console.error("Error sending verification email " + error);
          console.error(error);
        });
      }
    })
  }

  public forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then(() => {
    this.router.navigate(['/login']);
    },error => {
      console.error("Error sending recovery email " + error);
      console.error(error);
    })
  }

  public googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(result => {
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error)
    })
  }

  public logout():void {
    this.fireauth.signOut().then(() =>{
      this.router.navigate(['/login']);
    })
  }
}
