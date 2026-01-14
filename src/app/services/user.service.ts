//import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';

// @Injectable({ providedIn: 'root' })
// export class UserService {
//   // Inyectamos el EnvironmentInjector para recuperar el contexto luego
//   private injector = inject(EnvironmentInjector);

//   constructor(private firestore: AngularFirestore) { }

//   crearUsuario(uid: string, email: string) {
//     // Restauramos el contexto de inyección manualmente
//     return runInInjectionContext(this.injector, () => {
//       return this.firestore.collection('admin').doc(uid).set({
//         email,
//  rol: 'admin',
//fechaCreado: new Date(),
//});
//});
//}
//}



import { Injectable, Injector, runInInjectionContext, EnvironmentInjector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private injector: EnvironmentInjector
  ) { }

  // 👉 COLECCIÓN USUARIOS
  crearUsuario(uid: string, email: string, rol: 'user' | 'proveedor' | 'admin') {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).set({
        email,
        rol,
        fechaCreado: new Date()
      });
    });
  }

  // 👉 COLECCIÓN PROVEEDORES (SOLO PROVEEDOR)
  crearProveedor(
    uid: string,
    data: {
      nombre: string;
      especialidad: string;
      ubicacion: string;
      contacto: string;
      email: string;
    }
  ) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('proveedores').doc(uid).set({
        ...data,
        fechaCreado: new Date()
      });
    });
  }
  obtenerUsuario(uid: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).valueChanges();
    });
  }

  obtenerTodosLosUsuarios(): Observable<Usuario[]> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection<Usuario>('usuarios').snapshotChanges().pipe(
        map((actions) => {
          // FALTA ESTE RETURN:
          return actions.map((a) => {
            const data = a.payload.doc.data() as Usuario;
            const uid = a.payload.doc.id;
            return { ...data, uid };
          });
        })
      );
    });
  }
  cambiarRol(uid: string, rolNuevo: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).update({
        rol: rolNuevo
      });
    });

  }
  eliminarUsuario(uid: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).delete();
    });

  }

}
