import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaProveedorComponent } from './bienvenida-proveedor/bienvenida-proveedor.component';
import { RouterModule } from '@angular/router';
import { BienvenidaUsuarioComponent } from './bienvenida-usuario/bienvenida-usuario.component';
import { BienvenidaAdminComponent } from './bienvenida-admin/bienvenida-admin.component';
import { CambiarRolComponent } from './bienvenida-admin/cambiar-rol/cambiar-rol.component';
import { DesactivarUsuarioComponent } from './bienvenida-admin/desactivar-usuario/desactivar-usuario.component';

@NgModule({
  declarations: [
    BienvenidaProveedorComponent,
    BienvenidaUsuarioComponent,
    BienvenidaAdminComponent,
    CambiarRolComponent,
    DesactivarUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashBoardModule { }
