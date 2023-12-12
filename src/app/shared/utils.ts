import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Utils{

    public isValidEmail(email: string): boolean {
        if(email.length == 0){
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public hasHTMLTags(input:string):boolean{
        return /<[a-z][\s\S]*>/i.test(input);
    }

    public isPasswordCorrect(password: string):boolean{
        if(password.length == 0){
            return false;
        }
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        // Check if the password meets all criteria
        return (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumber &&
            hasSpecialCharacter
        );
      }
} 