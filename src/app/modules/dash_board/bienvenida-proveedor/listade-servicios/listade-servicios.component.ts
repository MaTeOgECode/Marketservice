import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioService } from '../../../../services/servicio.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Serviciomodels } from '../../../../models/serviciomodels';

@Component({
  selector: 'app-listade-servicios',
  standalone: false,
  templateUrl: './listade-servicios.component.html',
  styleUrl: './listade-servicios.component.css'
})
export class ListadeServiciosComponent implements OnInit {
  serviciosProveedor: any[] = [];
  
  // Variables para el Modal
  mostrarModal: boolean = false;
  servicioEdicion: any = {}; 

  constructor(
    private servicioService: ServicioService,
    private afAuth: AngularFireAuth,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.servicioService.obtenerServiciosPorProveedor(user.uid).subscribe(servicios => {
        this.serviciosProveedor = servicios;
        
        // Verificar contratos para cada servicio
        this.serviciosProveedor.forEach(s => {
          this.servicioService.verificarContratos(s.id).subscribe(contratos => {
            s.totalContratos = contratos.length;
            this.cdr.detectChanges();
          });
        });
        this.cdr.detectChanges();
      });
    }
  }

  // Abrir modal y clonar los datos para no editar el original antes de guardar
  abrirModal(servicio: any) {
    this.servicioEdicion = { ...servicio }; 
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.servicioEdicion = {};
  }

  async guardarCambios() {
    if (this.servicioEdicion.id) {
      const { id, totalContratos, ...datosAActualizar } = this.servicioEdicion;
      
      await this.servicioService.actualizarServicio(id, datosAActualizar);
      alert('Servicio actualizado correctamente');
      this.cerrarModal();
    }
  }

  async eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      await this.servicioService.eliminarServicio(id);
      alert('Servicio eliminado.');
    }
  }
}