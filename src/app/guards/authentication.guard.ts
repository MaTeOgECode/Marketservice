import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { map, take, switchMap, of } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.getAuthState().pipe(
    take(1),
    switchMap(user => {
      // 1. Si ni siquiera está logueado, al login.
      if (!user) {
        router.navigate(['/login']);
        return of(false);
      }

      // 2. Si está logueado, obtenemos su perfil de la base de datos
      return authService.obtenerUsuario(user.uid).pipe(
        take(1),
        map((usuario: any) => {
          const rolRequerido = route.data['rol'];

          // 3. ¿Tiene el rol necesario para esta ruta?
          if (usuario && usuario.rol === rolRequerido) {
            return true;
          }

          // 4. Si tiene un rol diferente, lo mandamos a SU página en lugar de al login
          if (usuario.rol === 'admin') {
            router.navigate(['/bienvenidaadmin']);
          } else if (usuario.rol === 'proveedor') {
            router.navigate(['/bienvenidadproveedor']);
          } else {
            router.navigate(['/bienvenidausuario']);
          }

          return false;
        })
      );
    })
  );
};