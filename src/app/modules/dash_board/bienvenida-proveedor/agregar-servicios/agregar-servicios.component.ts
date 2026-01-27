import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioService } from '../../../../services/servicio.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Serviciomodels } from '../../../../models/serviciomodels'; 
import { CategoriaService } from '../../../../services/categoria.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Nuevo: Importar Storage
import { finalize } from 'rxjs/operators'; // Nuevo: Para manejar el flujo de subida

@Component({
  selector: 'app-agregar-servicios',
  standalone: false,
  templateUrl: './agregar-servicios.component.html',
  styleUrl: './agregar-servicios.component.css'
})
export class AgregarServiciosComponent implements OnInit {

  nombreServicio: string = '';
  descripcionServicio: string = '';
  precioServicio: number = 0;
  categoriaServicio: string = '';
  urlImagen: string = ''; 
  listaCategorias: any[] = [];
  
  // Nuevas variables para Storage
  archivoLocal: any = null;
  cargandoImagen: boolean = false;
  porcentajeSubida: number = 0;

  constructor(
    private servicioService: ServicioService,
    private afAuth: AngularFireAuth,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef,
    private storage: AngularFireStorage // Inyectar Storage
  ) {}

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe(data => {
      this.listaCategorias = data;
      this.cdr.detectChanges();
    });
  }

  // Captura el archivo seleccionado del input file
onFileSelected(event: any) {
  const file = event.target.files[0]; // Capturamos el primer archivo
  
  if (file) { // Solo si el usuario realmente seleccionó algo
    this.archivoLocal = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.urlImagen = e.target.result; // Esto es para la vista previa
      this.cdr.detectChanges(); 
    };
    reader.readAsDataURL(file); // Aquí es donde fallaba si no validabas el 'if(file)'
  }
}

  async guardarServicio() {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) { alert('Debes estar autenticado'); return; }

      if (!this.nombreServicio || !this.categoriaServicio || this.precioServicio <= 0) {
        alert('Por favor, completa los campos principales'); return;
      }

      // 1. Si hay un archivo local, subirlo primero
      if (this.archivoLocal) {
        this.cargandoImagen = true;
        const filePath = `servicios/${Date.now()}_${this.archivoLocal.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.archivoLocal);

        // Observar porcentaje
        task.percentageChanges().subscribe(p => {
          this.porcentajeSubida = p || 0;
          this.cdr.detectChanges();
        });

        // Obtener URL al finalizar
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(async (url) => {
              this.urlImagen = url;
              await this.crearDocumentoServicio(user.uid);
            });
          })
        ).subscribe();
      } else {
        // 2. Si no hay archivo, usar la URL del input o el placeholder
        await this.crearDocumentoServicio(user.uid);
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar.');
    } finally {
      this.cargandoImagen = false;
    }
  }

  // Función separada para guardar en Firestore
  async crearDocumentoServicio(userId: string) {
    const nuevoServicio: Serviciomodels = {
      nombre: this.nombreServicio,
      descripcion: this.descripcionServicio,
      precio: this.precioServicio,
      categoria: this.categoriaServicio,
      proveedorId: userId,
      imagen: this.urlImagen || 'https://via.placeholder.com/500x300?text=Sin+Imagen',
      fechaCreacion: new Date(),
      activo: true
    };

    await this.servicioService.crearServicio(nuevoServicio);
    alert('Servicio publicado con éxito');
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.nombreServicio = '';
    this.descripcionServicio = '';
    this.precioServicio = 0;
    this.categoriaServicio = '';
    this.urlImagen = ''; 
    this.archivoLocal = null;
    this.porcentajeSubida = 0;
  }
}