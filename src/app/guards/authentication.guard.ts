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
      if (!user) {
        router.navigate(['/login']);
        return of(false);
      }

      // Si hay usuario, verificamos su rol en Firestore
      return authService.obtenerUsuario(user.uid).pipe(
        take(1),
        map((usuario: any) => {
          const rolEsperado = route.data['rol']; // Obtenemos el rol desde la ruta

          if (usuario && usuario.rol === rolEsperado) {
            return true;
          } else {
            // Si el rol no coincide, redirigir a su pantalla de bienvenida correcta
            router.navigate(['/login']);
            return false;
          }
        })
      );
    })
  );
};