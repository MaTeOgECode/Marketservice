import { Component, ChangeDetectorRef, OnInit, EnvironmentInjector } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Usuario } from '../../../../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-desactivar-usuario',
  standalone: false,
  templateUrl: './desactivar-usuario.component.html',
  styleUrl: './desactivar-usuario.component.css'
})
export class DesactivarUsuarioComponent implements OnInit {

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
  eliminarUsuario(uid: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.eliminarUsuario(uid).then(() => {
        console.log('Usuario eliminado de Firestore');
      });
    }
  }
}
