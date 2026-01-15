import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-cambiar-rol',
  standalone: false,
  templateUrl: './cambiar-rol.component.html',
  styleUrl: './cambiar-rol.component.css'
})
export class CambiarRolComponent implements OnInit {

  usuarios: Usuario[] = [];

  // 🔹 Tipado correcto del rol
  rolSeleccionado: {
    [uid: string]: 'user' | 'proveedor' | 'admin'
  } = {};

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.obtenerTodosLosUsuarios().subscribe((usuarios: Usuario[]) => {

      usuarios.forEach(usuario => {
        this.rolSeleccionado[usuario.uid] = usuario.rol;
      });

      this.usuarios = usuarios;
      this.cdr.detectChanges();
    });
  }

  cambiarRol(uid: string): void {
    const rolNuevo = this.rolSeleccionado[uid];

    this.userService.cambiarRol(uid, rolNuevo)
      .then(() => console.log('Rol actualizado correctamente'))
      .catch(err => console.error('Error al cambiar rol', err));
  }
}
