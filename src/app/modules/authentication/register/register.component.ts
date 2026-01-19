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
  rol: 'usuario' | 'proveedor' = 'usuario';

  // 🔹 DATOS SOLO PARA PROVEEDOR
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

    // ✅ Validación solo si es proveedor
    if (this.rol === 'proveedor') {
      if (!this.nombre || !this.especialidad || !this.ubicacion || !this.contacto) {
        alert('Completa todos los datos del proveedor');
        return;
      }
    }

    this.authService.register(this.email, this.password)
      .then((cred: any) => {
        const uid = cred.user.uid;

        // ✅ TODO SE GUARDA EN LA MISMA COLECCIÓN "usuarios"
        return this.userService.crearUsuario(uid, {
          email: this.email,
          rol: this.rol,
          ...(this.rol === 'proveedor' && {
            nombre: this.nombre,
            especialidad: this.especialidad,
            ubicacion: this.ubicacion,
            contacto: this.contacto
          })
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
