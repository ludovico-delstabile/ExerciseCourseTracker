import { RedirectCommand, Router, type CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn() ? true : new RedirectCommand(inject(Router).parseUrl('/login'));
};
