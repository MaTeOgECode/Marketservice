import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
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
    this.authenticationService.
      login(this.email, this.password)
      .then((cred) => {
        const uid = cred.user?.uid;
        this.authenticationService.obtenerUsuario(uid!)
          .pipe(take(1))
          .subscribe((usuario: any) => {
            console.log(usuario);
            if (usuario.rol === 'admin') {
              this.router.navigate(['/bienvenidaadmin']);
            } else if (usuario.rol === 'proveedor') {
              this.router.navigate(['/bienvenidaproveedor']);
            } else {
              this.router.navigate(['/bienvenidausuario']);
            }
          })
      })
  }
  logout() {
    this.authenticationService.logout().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
