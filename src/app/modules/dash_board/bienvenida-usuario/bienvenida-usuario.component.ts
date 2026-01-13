import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-bienvenida-usuario',
  standalone: false,
  templateUrl: './bienvenida-usuario.component.html',
  styleUrl: './bienvenida-usuario.component.css'
})
export class BienvenidaUsuarioComponent {
  constructor(private router: Router, private authService: AuthenticationService) { }
    logout() {
    
    this.router.navigate(['/login']);
  }

}
