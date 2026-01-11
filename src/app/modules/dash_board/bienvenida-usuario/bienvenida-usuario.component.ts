import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida-usuario',
  standalone: false,
  templateUrl: './bienvenida-usuario.component.html',
  styleUrl: './bienvenida-usuario.component.css'
})
export class BienvenidaUsuarioComponent {
  constructor(private router: Router) { }
  logout() {
    this.router.navigate(['/login']);
  }

}
