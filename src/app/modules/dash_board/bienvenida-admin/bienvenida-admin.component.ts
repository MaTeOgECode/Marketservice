import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bienvenida-admin',
  standalone: false,
  templateUrl: './bienvenida-admin.component.html',
  styleUrl: './bienvenida-admin.component.css'
})
export class BienvenidaAdminComponent {
  constructor(private router: Router) { }
  logout() {
    this.router.navigate(['/login']);
  }
}
