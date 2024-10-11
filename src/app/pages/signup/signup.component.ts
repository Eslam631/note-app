import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent  {
  apiErr:string=''
  msgSusses:boolean=false
  isloading:boolean=false

  private readonly _FormBuilder=inject(FormBuilder)
  private readonly Router=inject(Router)
  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required, Validators.pattern(/^\w{6,}$/)],],
    age:[null,[Validators.required]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],



  })

  registerSun!:Subscription


  private readonly _AuthService=inject(AuthService)
  registerSubmit(form:FormGroup):void{
    this.isloading=true

this.registerSun=this._AuthService.registerApi(form.value).subscribe({
  next: (res) =>{ console.log(res)
    this.msgSusses=true
    this.isloading=false
    this.Router.navigate(['/Signin'])
    
  },
  error: (err) =>{ console.log(err)
    this.apiErr=err.error.msg
    this.isloading=false
  },
})

}
// ngOnDestroy(): void {
//     this.registerSun.unsubscribe();
// }
}
