import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Log } from '../model/log';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private angularFireStore: AngularFirestore) { }
  

  private addLog(logMessage: Log):any{
    const timestamp = new Date();
    const user = getAuth().currentUser?.email; 
    logMessage.user = user ?? '';
    logMessage.timestamp = timestamp.toLocaleTimeString();
    return this.angularFireStore.collection('/Logs').add(logMessage);
  }

  public info(message:string):void {
    const prefix = "INFO";
    const logMessage: Log = {level: prefix, message: message, user:'', timestamp:''}
    this.addLog(logMessage);
  }

  public warn(message:string):void {
    const prefix = "WARN";
    const logMessage: Log = {level: prefix, message: message, user:'', timestamp:''}
    this.addLog(logMessage);
  }

  public error(message:string):void {
    const prefix = "ERROR";
    const logMessage: Log = {level: prefix, message: message, user:'', timestamp:''}
    this.addLog(logMessage);
  }

}
