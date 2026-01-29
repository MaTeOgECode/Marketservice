import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../../../services/servicio.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Serviciomodels } from '../../../models/serviciomodels';
@Component({
  selector: 'app-detalle-servicio',
  standalone: false,
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit {
  servicio: any;
  proveedor: any;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private firestore: AngularFirestore,
   
    private afAuth: AngularFireAuth,


  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const db = this.firestore.firestore;

    try {
      if (id) {
        // 1. Obtener el servicio
        const sDoc = await db.collection('servicios').doc(id).get();
        if (sDoc.exists) {
          this.servicio = { id: sDoc.id, ...sDoc.data() };

          // 2. Obtener el proveedor (Tomas Leed) usando el proveedorId del servicio
          const pDoc = await db.collection('usuarios').doc(this.servicio.proveedorId).get();
          if (pDoc.exists) {
            this.proveedor = pDoc.data();
          }
        }
      }
    } catch (error) {
      console.error("Error cargando detalles:", error);
    } finally {
      this.cargando = false;
    }
  }

 async contratar(servicio: Serviciomodels) {
    const mensaje = `¿Estás seguro de que deseas contratar el servicio: "${servicio.nombre}"?`;
    
    if (confirm(mensaje)) {
      const user = await this.afAuth.currentUser;

      if (!user) {
        alert('Debes iniciar sesión para contratar un servicio.');
        return;
      }

      if (servicio.id) {
        this.servicioService.contratarServicio(user.uid, servicio.id, servicio.proveedorId)
          .then(() => {
            alert(`¡Felicidades! Has contratado: ${servicio.nombre}`);
          })
          .catch(error => {
            console.error('Error en la contratación:', error);
            alert('No se pudo procesar la contratación.');
          });
      }
    }
  }
}