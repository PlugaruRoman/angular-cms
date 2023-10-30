import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUserService = inject(AuthService);
  const router = inject(Router);

  if (!currentUserService.isLoggedIn()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
