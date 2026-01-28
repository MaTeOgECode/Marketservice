import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  hoverRating: number = 0;
  // Variables para la calificación
  mostrarModalResena: boolean = false;
  itemSeleccionado: any = null;
  puntuacion: number = 0;

  constructor(
    private servicioService: ServicioService,
    private afAuth: AngularFireAuth,
    private cdr: ChangeDetectorRef 
  ) {}

  async ngOnInit() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.servicioService.obtenerContratacionesPorCliente(user.uid).subscribe(data => {
        this.misContrataciones = data;
        this.cdr.detectChanges(); 
      });
    }
  }

  // Lógica de Estrellas
 abrirModalCompletar(item: any, event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  this.itemSeleccionado = item;
  this.puntuacion = 0;
  this.mostrarModalResena = true;
  this.cdr.detectChanges();
}

cerrarModal() {
  this.mostrarModalResena = false; // Oculta el modal
  this.itemSeleccionado = null;    // Limpia el item seleccionado
  this.puntuacion = 0;             // Reinicia la puntuación
  this.hoverRating = 0;            // Reinicia el efecto visual de estrellas
  
  // Forzamos a Angular a actualizar la vista para que el modal desaparezca
  this.cdr.detectChanges();
}
setRating(valor: number) {
  this.puntuacion = valor;
  // Forzamos la actualización de la UI para que las estrellas cambien de color
  this.cdr.markForCheck(); 
  this.cdr.detectChanges();
}

async confirmarCompletado() {
  if (!this.itemSeleccionado || !this.itemSeleccionado.id) {
    alert("No se ha seleccionado un servicio válido.");
    return;
  }

  // Verificamos por consola qué estamos enviando
  console.log("Enviando:", this.itemSeleccionado.id, this.itemSeleccionado.servicioId, this.puntuacion);

  try {
    await this.servicioService.completarContratacion(
      this.itemSeleccionado.id, 
      this.itemSeleccionado.servicioId, 
      this.puntuacion
    );
    
    this.cerrarModal();
    alert("¡Servicio finalizado y calificado correctamente!");
    this.cdr.detectChanges(); 
  } catch (error) {
    console.error("Error en el componente:", error);
    alert("Hubo un error técnico. Revisa que el ID del servicio sea correcto en la base de datos.");
  }
}
  // --- Tus métodos anteriores ---
  async cancelar(id: string) {
    if (confirm('¿Estás seguro de que deseas CANCELAR este servicio?')) {
      await this.servicioService.cancelarContratacion(id);
      alert('Servicio cancelado correctamente.');
    }
  }

  async eliminar(id: string) {
    if (confirm('¿Estás seguro de que deseas ELIMINAR este registro definitivamente?')) {
      await this.servicioService.eliminarContratacion(id);
      alert('Registro borrado.');
    }
  }
}