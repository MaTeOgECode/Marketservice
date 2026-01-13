import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-bienvenida-admin',
  standalone: false,
  templateUrl: './bienvenida-admin.component.html',
  styleUrl: './bienvenida-admin.component.css'
})
export class BienvenidaAdminComponent {
  constructor(private router: Router, private authService: AuthenticationService) { }
  logout() {
    this.router.navigate(['/login']);
  }
}

