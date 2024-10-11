import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken:BehaviorSubject<any>=new BehaviorSubject(null)
  private readonly _Router=inject(Router)

 private readonly _HttpClient=inject(HttpClient)

 setUserToken():void{
  let token=localStorage.getItem('token')
  if(token!==null){
    this.userToken.next(token)

  }
 }

 registerApi(userInfo:object):Observable<any>{
  return this._HttpClient.post( `${environment.baseurl}signUp`,userInfo);
 }
 loginApi(user:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseurl}signIn`,user);
 }
 logOut():void{
  localStorage.removeItem('token')
  this._Router.navigate(['/Signin'])
 }
}
