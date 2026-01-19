import { Component } from '@angular/core';
import { ServicioService } from '../../../../services/servicio.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Serviciomodels } from '../../../../models/serviciomodels'; 

@Component({
  selector: 'app-agregar-servicios',
  standalone: false,
  templateUrl: './agregar-servicios.component.html',
  styleUrl: './agregar-servicios.component.css'
})
export class AgregarServiciosComponent {

  nombreServicio: string = '';
  descripcionServicio: string = '';
  precioServicio: number = 0;
  categoriaServicio: string = '';
  urlImagen: string = ''; // <--- Nueva variable para la URL

  constructor(
    private servicioService: ServicioService,
    private afAuth: AngularFireAuth
  ) {}

 // ... dentro de AgregarServiciosComponent
async guardarServicio() {
  try {
    const user = await this.afAuth.currentUser;

    if (!user) {
      alert('Debes estar autenticado');
      return;
    }

    const nuevoServicio: Serviciomodels = {
      nombre: this.nombreServicio,
      descripcion: this.descripcionServicio,
      precio: this.precioServicio,
      categoria: this.categoriaServicio,
      proveedorId: user.uid,
      imagen: this.urlImagen || 'https://via.placeholder.com/500x300?text=Sin+Imagen',
      fechaCreacion: new Date(),
      activo: true
    };

    // Ahora la llamada al servicio es segura
    await this.servicioService.crearServicio(nuevoServicio);
    
    alert('Servicio creado exitosamente');
    this.limpiarFormulario();
    
  } catch (error) {
    console.error('Error capturado:', error);
    alert('Error al guardar. Revisa la consola.');
  }
}

  limpiarFormulario() {
    this.nombreServicio = '';
    this.descripcionServicio = '';
    this.precioServicio = 0;
    this.categoriaServicio = '';
    this.urlImagen = ''; // <--- Limpiar también la URL
  }
}