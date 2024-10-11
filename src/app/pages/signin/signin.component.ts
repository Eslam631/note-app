import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
msgErro:string=''
  msgSusses:boolean=false
  isloading:boolean=false
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly Router=inject(Router)
  private readonly _AuthService=inject(AuthService)
  loginSun!:Subscription
  loginForm:FormGroup=this._FormBuilder.group({

    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required, Validators.pattern(/^\w{6,}$/)],],




  })
  logiinSubmit(form:FormGroup):void{
    this.isloading=true
    this.loginSun=this._AuthService.loginApi(form.value).subscribe({
      next:(res)=>{
        localStorage.setItem('token','3b8ny__'+res.token)

        this.isloading=false
        this.msgSusses=true
        this.Router.navigate(['/notes'])


      },
      error:(err)=>{

        this.msgErro=err.error.msg
        this.isloading=false

       },

    })

  }
  // ngOnDestroy(): void {
  //     this.loginSun.unsubscribe()
  // }
}
