import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bienvenida-proveedor',
  standalone: false,
  templateUrl: './bienvenida-proveedor.component.html',
  styleUrl: './bienvenida-proveedor.component.css'
})
export class BienvenidaProveedorComponent {
    constructor(private router: Router) { }
  logout() {
    this.router.navigate(['/login']);
  }
}
