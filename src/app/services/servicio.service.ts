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
// servicio.service.ts

async completarContratacion(contratoId: string, servicioId: string, estrellas: number) {
  // Obtenemos la instancia pura de Firestore para evitar errores de inyección de Angular
  const db = this.firestore.firestore;

  try {
    // 1. Actualizar el documento del contrato en servicios_contratados
    const contratoRef = db.collection('servicios_contratados').doc(contratoId);
    await contratoRef.update({
      estado: 'completado',
      calificacion: estrellas,
      fechaFinalizado: new Date()
    });

    // 2. Recalcular el promedio solo si el usuario calificó
    if (estrellas > 0 && servicioId) {
      // Consulta directa al SDK de Firebase
      const snapshot = await db.collection('servicios_contratados')
        .where('servicioId', '==', servicioId)
        .where('estado', '==', 'completado')
        .get();

      if (!snapshot.empty) {
        const calificaciones = snapshot.docs
          .map(doc => doc.data()['calificacion'])
          .filter(c => typeof c === 'number' && c > 0);

        const totalVotos = calificaciones.length;
        const suma = calificaciones.reduce((a, b) => a + b, 0);
        const promedio = suma / totalVotos;

        // Actualizar el documento del servicio original en la colección 'servicios'
        await db.collection('servicios').doc(servicioId).update({
          promedioEstrellas: Number(promedio.toFixed(1)),
          totalVotos: totalVotos
        });
      }
    }
    return true;
  } catch (error) {
    console.error("Error crítico en la base de datos:", error);
    throw error;
  }
}


}