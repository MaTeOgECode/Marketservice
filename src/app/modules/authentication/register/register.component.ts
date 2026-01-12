import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email = '';
  password = '';
  rol: 'user' | 'proveedor' = 'user';

  // DATOS PROVEEDOR
  nombre = '';
  especialidad = '';
  ubicacion = '';
  contacto = '';

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  registrar() {

    if (this.rol === 'proveedor') {
      if (!this.nombre || !this.especialidad || !this.ubicacion || !this.contacto) {
        alert('Completa todos los datos del proveedor');
        return;
      }
    }

    this.authService.register(this.email, this.password, this.rol)
      .then((cred: any) => {
        const uid = cred.user.uid;

        return this.userService.crearUsuario(uid, this.email, this.rol)
          .then(() => {
            if (this.rol === 'proveedor') {
              return this.userService.crearProveedor(uid, {
                nombre: this.nombre,
                especialidad: this.especialidad,
                ubicacion: this.ubicacion,
                contacto: this.contacto,
                email: this.email
              });
            }
            return Promise.resolve(); // 🔑 evita TS7030
          });
      })
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Error al registrar', error);
      });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
