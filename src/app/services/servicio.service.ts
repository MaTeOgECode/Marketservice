import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Serviciomodels } from '../models/serviciomodels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector // Agregamos el Injector
  ) { }

  // Envolvemos la creación en runInInjectionContext para evitar el error NG0203
  crearServicio(servicio: Serviciomodels) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('servicios').add(servicio);
    });
  }

  obtenerTodosLosServicios(): Observable<Serviciomodels[]> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection<Serviciomodels>('servicios', ref => 
        ref.where('activo', '==', true)
      ).valueChanges({ idField: 'id' });
    });
  }

  contratarServicio(clienteId: string, servicioId: string, proveedorId: string) {
    return runInInjectionContext(this.injector, () => {
      const contratacion = {
        clienteId,
        servicioId,
        proveedorId,
        fechaContratacion: new Date(),
        estado: 'pendiente'
      };
      return this.firestore.collection('servicios_contratados').add(contratacion);
    });
  }
}