import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-bienvenida-proveedor',
  standalone: false,
  templateUrl: './bienvenida-proveedor.component.html',
  styleUrl: './bienvenida-proveedor.component.css'
})
export class BienvenidaProveedorComponent {
    constructor(private router: Router, private authService: AuthenticationService) { }
        logout() {
    
    this.router.navigate(['/login']);
  }
}
