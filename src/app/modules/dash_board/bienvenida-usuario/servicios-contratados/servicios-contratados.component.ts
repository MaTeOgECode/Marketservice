import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Añadido ChangeDetectorRef
import { ServicioService } from '../../../../services/servicio.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-servicios-contratados',
  standalone: false,
  templateUrl: './servicios-contratados.component.html',
  styleUrl: './servicios-contratados.component.css'
})
export class ServiciosContratadosComponent implements OnInit {
  misContrataciones: any[] = [];

  constructor(
    private servicioService: ServicioService,
    private afAuth: AngularFireAuth,
    private cdr: ChangeDetectorRef // Inyectar el detector de cambios
  ) {}

  async ngOnInit() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.servicioService.obtenerContratacionesPorCliente(user.uid).subscribe(data => {
        this.misContrataciones = data;
        // Forzamos a Angular a actualizar la vista inmediatamente
        this.cdr.detectChanges(); 
      });
    }
  }

  async cancelar(id: string) {
    if (confirm('¿Estás seguro de que deseas CANCELAR este servicio?')) {
      await this.servicioService.cancelarContratacion(id);
      alert('Servicio cancelado correctamente.');
      // No hace falta recargar, el subscribe de ngOnInit detectará el cambio solo
    }
  }

  async eliminar(id: string) {
    if (confirm('¿Estás seguro de que deseas ELIMINAR este registro definitivamente?')) {
      await this.servicioService.eliminarContratacion(id);
      alert('Registro borrado.');
    }
  }
}