import { Component, ChangeDetectorRef, OnInit, EnvironmentInjector } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Usuario } from '../../../../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-cambiar-rol',
  standalone: false,
  templateUrl: './cambiar-rol.component.html',
  styleUrl: './cambiar-rol.component.css'
})
export class CambiarRolComponent implements OnInit {

  usuarios: Usuario[] = [];
  rolSeleccionado: { [uid: string]: string } = {};

  constructor(private userService: UserService,
    private cdr: ChangeDetectorRef,
    private injector: EnvironmentInjector,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.userService.obtenerTodosLosUsuarios().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);

      usuarios.forEach((usuario: Usuario) => {
        this.rolSeleccionado[usuario.uid] = usuario.rol;
      });

      this.usuarios = usuarios;
      this.cdr.detectChanges();
    });
  }
  cambiarRol(uid: string): void {
    const rolNuevo = this.rolSeleccionado[uid];
    this.userService.cambiarRol(uid, rolNuevo).then(() => {
      console.log('Rol actualizado');
    });
  }


}

