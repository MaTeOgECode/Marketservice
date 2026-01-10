import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  enail: string = '';
  password: string = '';
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  login() {
    this.authenticationService.login(this.enail, this.password)
      .then(() => {
        this.router.navigate(['/user']);
      })
      .catch((error) => {
        console.log('Error al iniciar sesión:', error);
      });
  }
  register() {
    this.router.navigate(['/register']);
  }
}
