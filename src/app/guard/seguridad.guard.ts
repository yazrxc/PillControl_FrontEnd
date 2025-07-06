import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

export const seguridadGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);

  // Asegura que estás en un entorno navegador
  const isBrowser = typeof window !== 'undefined';
  const rpta = isBrowser && lService.verificar();

  if (!rpta) {
    router.navigate(['/landing/login']);
    return false;
  }
  return true;
};