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
  email: string = '';
  password: string = '';
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  login() {
    this.authenticationService.login(this.email, this.password)
      .then((userData: any) => {
        if (userData?.rol === 'admin') {
          this.router.navigate(['/bienvenidaadmin']);
        } else {
          this.router.navigate(['/bienvenidausuario']);
        }
      })
      .catch(error => console.log(error));
  }

  register() {
    this.router.navigate(['/register']);
  }
}
