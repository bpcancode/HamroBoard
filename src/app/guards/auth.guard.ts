import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.currentUser) {
    return true;
  } else {
    return router.createUrlTree(['/']);
  }
};
