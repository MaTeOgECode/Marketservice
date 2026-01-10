import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  constructor(private authService: AuthenticationService, private router: Router) { }
  registrar() {

    this.authService.register(this.email, this.password)
      .then((user) => {
        this.router.navigate(['/login']);
      }).catch((error) => {
        console.log("Error al registrar", error);
      });
  }
  login() {
    this.router.navigate(['/login']);
  }
}