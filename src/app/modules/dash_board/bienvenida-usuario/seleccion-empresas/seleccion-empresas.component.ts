import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../../services/servicio.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Serviciomodels } from '../../../../models/serviciomodels';

@Component({
  selector: 'app-seleccion-empresas',
  standalone: false,
  templateUrl: './seleccion-empresas.component.html',
  styleUrl: './seleccion-empresas.component.css'
})
export class SeleccionEmpresasComponent implements OnInit {

  serviciosDisponibles: Serviciomodels[] = [];

  constructor(
    private servicioService: ServicioService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.obtenerTodosLosServicios().subscribe(data => {
      this.serviciosDisponibles = data;
    });
  }

  async contratar(servicio: Serviciomodels) {
    // 1. Mensaje de confirmación previo
    const mensaje = `¿Estás seguro de que deseas contratar el servicio: "${servicio.nombre}" por $${servicio.precio}?`;
    
    if (confirm(mensaje)) {
      // Si el usuario hace clic en "Aceptar"
      const user = await this.afAuth.currentUser;

      if (!user) {
        alert('Debes iniciar sesión para contratar un servicio.');
        return;
      }

      if (servicio.id) {
        this.servicioService.contratarServicio(user.uid, servicio.id, servicio.proveedorId)
          .then(() => {
            alert(`¡Contratación exitosa! Te has suscrito a: ${servicio.nombre}`);
            // Como solicitaste, no hay navegación: el usuario se queda aquí.
          })
          .catch(error => {
            console.error('Error en la contratación:', error);
            alert('Lo sentimos, no se pudo procesar la contratación en este momento.');
          });
      }
    } else {
      // Si el usuario hace clic en "Cancelar"
      console.log('Contratación cancelada por el usuario');
    }
  }
}