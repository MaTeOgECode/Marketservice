import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importar ChangeDetectorRef
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
    private afAuth: AngularFireAuth,
    private cdr: ChangeDetectorRef // 2. Inyectar el detector
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.obtenerTodosLosServicios().subscribe(data => {
      this.serviciosDisponibles = data;
      // 3. Forzar la actualización de la vista al recibir los datos
      this.cdr.detectChanges(); 
    }, error => {
      console.error('Error al cargar servicios:', error);
    });
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