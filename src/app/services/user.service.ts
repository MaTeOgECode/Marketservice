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



import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector
  ) {}

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
}
