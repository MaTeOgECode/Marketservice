import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Inyectamos el EnvironmentInjector para recuperar el contexto luego
  private injector = inject(EnvironmentInjector);

  constructor(private firestore: AngularFirestore) { }

  crearUsuario(uid: string, email: string) {
    // Restauramos el contexto de inyección manualmente
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('admin').doc(uid).set({
        email,
        rol: 'admin',
        fechaCreado: new Date(),
      });
    });
  }
}