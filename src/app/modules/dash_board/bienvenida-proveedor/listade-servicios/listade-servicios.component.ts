import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioService } from '../../../../services/servicio.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriaService } from '../../../../services/categoria.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-listade-servicios',
  standalone: false,
  templateUrl: './listade-servicios.component.html',
  styleUrl: './listade-servicios.component.css'
})
export class ListadeServiciosComponent implements OnInit {
  serviciosProveedor: any[] = [];
  listaCategorias: any[] = [];
  
  mostrarModal: boolean = false;
  servicioEdicion: any = {}; 
  archivoNuevo: any = null;
  cargando: boolean = false;

  constructor(
    private servicioService: ServicioService,
    private afAuth: AngularFireAuth,
    private categoriaService: CategoriaService,
    private storage: AngularFireStorage,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    // Cargar categorías para el select del modal
    this.categoriaService.obtenerCategorias().subscribe(cats => {
      this.listaCategorias = cats;
    });

    const user = await this.afAuth.currentUser;
    if (user) {
      this.servicioService.obtenerServiciosPorProveedor(user.uid).subscribe(servicios => {
        this.serviciosProveedor = servicios;
        // Verificamos contratos para el badge de "Disponible/Contratado"
        this.serviciosProveedor.forEach(s => {
          this.servicioService.verificarContratos(s.id).subscribe(contratos => {
            s.totalContratos = contratos.length;
            this.cdr.detectChanges();
          });
        });
      });
    }
  }

  // Abrir el modal con los datos del servicio seleccionado
  abrirModal(servicio: any) {
    this.servicioEdicion = { ...servicio }; 
    this.archivoNuevo = null;
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.servicioEdicion = {};
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoNuevo = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.servicioEdicion.imagen = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  async guardarCambios() {
    this.cargando = true;
    if (this.archivoNuevo) {
      const path = `servicios/${Date.now()}_${this.archivoNuevo.name}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, this.archivoNuevo);

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(async (url) => {
            this.servicioEdicion.imagen = url;
            await this.ejecutarActualizacion();
          });
        })
      ).subscribe();
    } else {
      await this.ejecutarActualizacion();
    }
  }

  async ejecutarActualizacion() {
    const { id, totalContratos, ...datos } = this.servicioEdicion;
    await this.servicioService.actualizarServicio(id, datos);
    alert('¡Servicio actualizado!');
    this.cargando = false;
    this.cerrarModal();
  }

  async eliminar(id: string) {
    if (confirm('¿Deseas eliminar este servicio permanentemente?')) {
      await this.servicioService.eliminarServicio(id);
    }
  }
}