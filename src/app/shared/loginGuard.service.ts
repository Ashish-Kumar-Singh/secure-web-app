import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable, inject } from "@angular/core";
import { getAuth } from "firebase/auth";

@Injectable({
    providedIn: 'root'
  })
export class LoginGuardService{
    constructor(private router: Router){
    }

    private isLoggedIn():boolean{
        if(getAuth().currentUser){
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }
    
    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.isLoggedIn();
    }
}

export const LoginGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(LoginGuardService).canActivate(next, state);
  }