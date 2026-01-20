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
  // En servicio.service.ts

// Obtener servicios contratados por el cliente actual
obtenerContratacionesPorCliente(clienteId: string): Observable<any[]> {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('servicios_contratados', ref => 
      ref.where('clienteId', '==', clienteId)
    ).valueChanges({ idField: 'id' });
  });
}

// Cambiar estado a 'cancelado'
cancelarContratacion(id: string) {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('servicios_contratados').doc(id).update({
      estado: 'cancelado'
    });
  });
}

// Borrar el registro del historial
eliminarContratacion(id: string) {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('servicios_contratados').doc(id).delete();
  });
}
// servicio.service.ts

// Obtener solo los servicios creados por el proveedor logueado
obtenerServiciosPorProveedor(proveedorId: string): Observable<Serviciomodels[]> {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection<Serviciomodels>('servicios', ref => 
      ref.where('proveedorId', '==', proveedorId)
    ).valueChanges({ idField: 'id' });
  });
}

// Actualizar un servicio existente
actualizarServicio(id: string, data: Partial<Serviciomodels>) {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('servicios').doc(id).update(data);
  });
}

// Eliminar servicio
eliminarServicio(id: string) {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('servicios').doc(id).delete();
  });
}

// Verificar si un servicio tiene contratos (para mostrar el estado al proveedor)
verificarContratos(servicioId: string): Observable<any[]> {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('servicios_contratados', ref => 
      ref.where('servicioId', '==', servicioId)
    ).valueChanges();
  });
}
}