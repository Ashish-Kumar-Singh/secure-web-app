import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId: string| undefined;
  
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  public getUserId(): void{
    this.fireauth.currentUser.then(
      user => {
        this.userId = user?.uid;
      }
    )
  }
  

  public login(email: string, password: string):void{
    this.fireauth.signInWithEmailAndPassword(email, password).then((result) => {
      localStorage.setItem('token', 'true');
      if(result.user?.emailVerified){
        this.router.navigate(['dashboard']);
      }
      else{
        this.router.navigate(['/verify']);
      }
    }, error => {
      console.log(error);
      alert('Something went wrong');
      this.router.navigate(['/login']);
    })
  }

  public register(email: string, password: string):void{
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration successful');
      this.sendEmailVerification();
    }, error =>{
      console.log(error);
      alert('Something went wrong');
      this.router.navigate(['/register']);
    })
  }

  private sendEmailVerification():void{
    this.fireauth.onAuthStateChanged(user => {
      if(user){
        user.sendEmailVerification().then((result:any) => {
          this.router.navigate(['/verify']);
        }, (error:any) =>{
          console.log(error);
        });
      }
    })
  }

  public forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then(() => {
    this.router.navigate(['/login']);
    },error => {
      console.log(error);
    })
  }

  public googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(result => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(result.user?.uid));
    }, error => {
      console.log(error)
    })
  }

  public logout():void {
    this.fireauth.signOut().then(() =>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
  }
}
