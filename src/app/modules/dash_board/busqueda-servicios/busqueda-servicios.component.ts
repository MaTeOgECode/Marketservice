import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda-servicios',
  standalone: false,
  templateUrl: './busqueda-servicios.component.html',
  styleUrls: ['./busqueda-servicios.component.css']
})
export class BusquedaServiciosComponent implements OnInit {
  servicios: any[] = [];
  serviciosFiltrados: any[] = [];
  categorias: string[] = ['Todos', 'Tecnología', 'Limpieza', 'Hogar', 'Salud', 'Educación'];
  
  categoriaSeleccionada: string = 'Todos';
  textoBusqueda: string = '';

  constructor(
    private servicioService: ServicioService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerServicios();
  }

  obtenerServicios() {
    this.servicioService.getServicios().subscribe({
      next: (res: any[]) => {
        // Aseguramos que los datos mapeen correctamente el campo 'imagen'
        this.servicios = res;
        this.aplicarFiltros();
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error al cargar servicios para búsqueda:", err)
    });
  }

  filtrarPorCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
    this.aplicarFiltros();
  }

  filtrarPorTexto(event: any) {
    this.textoBusqueda = event.target.value.toLowerCase();
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.serviciosFiltrados = this.servicios.filter(s => {
      // Normalización para evitar errores por tildes o mayúsculas en categorías
      const catBase = s.categoria?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || '';
      const catBusca = this.categoriaSeleccionada.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const coincideCat = this.categoriaSeleccionada === 'Todos' || catBase === catBusca;
      
      const nombre = s.nombre?.toLowerCase() || '';
      const desc = s.descripcion?.toLowerCase() || '';
      const coincideTexto = nombre.includes(this.textoBusqueda) || desc.includes(this.textoBusqueda);

      return coincideCat && coincideTexto;
    });
  }

  // Función de respaldo en caso de que el routerLink del HTML dé problemas
  irADetalle(id: string) {
    this.router.navigate(['/bienvenidausuario/detalle-servicio', id]);
  }
}