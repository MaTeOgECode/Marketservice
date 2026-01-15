import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private injector: EnvironmentInjector
  ) {}

  // ✅ CREAR USUARIO / PROVEEDOR / ADMIN (MISMA COLECCIÓN)
  crearUsuario(
    uid: string,
    data: {
      email: string;
      rol: 'user' | 'proveedor' | 'admin';
      nombre?: string;
      especialidad?: string;
      ubicacion?: string;
      contacto?: string;
    }
  ) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).set({
        ...data,
        fechaCreado: new Date()
      });
    });
  }

  // ✅ OBTENER USUARIO POR UID
  obtenerUsuario(uid: string): Observable<Usuario | undefined> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection<Usuario>('usuarios').doc(uid).valueChanges();
    });
  }

  // ✅ OBTENER TODOS LOS USUARIOS
  obtenerTodosLosUsuarios(): Observable<Usuario[]> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection<Usuario>('usuarios').snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Usuario;
            const uid = a.payload.doc.id;
            return { ...data, uid };
          })
        )
      );
    });
  }

  // ✅ CAMBIAR ROL
  cambiarRol(uid: string, rolNuevo: 'user' | 'proveedor' | 'admin') {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).update({
        rol: rolNuevo
      });
    });
  }

  // ✅ ELIMINAR USUARIO
  eliminarUsuario(uid: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).delete();
    });
  }
}
