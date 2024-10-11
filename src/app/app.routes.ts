import { SignupComponent } from './pages/signup/signup.component';
import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { userdataGuard } from './userdata.guard';
import { loginDataGuard } from './login-data.guard';

export const routes: Routes = [
  {path:'',redirectTo:'Signin',pathMatch:'full'},
  {path:'Signin',canActivate:[loginDataGuard],component:SigninComponent,title:'singin'},
  {path:'signup',component:SignupComponent,title:'signup'},
  {path:'notes',canActivate:[userdataGuard],component:NotesComponent,title:'notes'},
  {path:'**',component:NotfoundComponent,title:'notfound'}


];
