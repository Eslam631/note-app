import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { platform } from 'os';

export const userdataGuard: CanActivateFn = (route, state) => {
const _PLATFORM_ID=inject(PLATFORM_ID)
  const _Router=inject(Router)
  if(isPlatformBrowser(_PLATFORM_ID))
    { if(localStorage.getItem('token')!==null)
    { return true;}
    else{
      _Router.navigate(['Signin'])
      return false;
    }
}



return false;
};
