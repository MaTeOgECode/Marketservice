import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categoriamodels } from '../models/categoriamodels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firestore: AngularFirestore, private injector: Injector) { }

  // Solo para el Admin
  crearCategoria(categoria: Categoriamodels) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('categorias').add(categoria);
    });
  }

  // Para el Proveedor y Admin
  obtenerCategorias(): Observable<Categoriamodels[]> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection<Categoriamodels>('categorias').valueChanges({ idField: 'id' });
    });
  }

  eliminarCategoria(id: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('categorias').doc(id).delete();
    });
  }
}