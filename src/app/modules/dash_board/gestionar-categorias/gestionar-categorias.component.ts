import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';



@Component({
  selector: 'app-gestionar-categoria',
  standalone: false,
  templateUrl: './gestionar-categorias.component.html',
  styleUrl: './gestionar-categorias.component.css'
})
export class GestionarCategoriaComponent implements OnInit {
  nombreCat: string = '';
  categorias: any[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.categoriaService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  agregar() {
    if (this.nombreCat.trim()) {
      this.categoriaService.crearCategoria({ nombre: this.nombreCat }).then(() => {
        this.nombreCat = '';
        alert('Categoría agregada');
      });
    }
  }

  borrar(id: string) {
    if(confirm('¿Eliminar categoría?')) {
      this.categoriaService.eliminarCategoria(id);
    }
  }
}

