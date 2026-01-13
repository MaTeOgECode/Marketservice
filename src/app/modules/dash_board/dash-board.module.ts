import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaProveedorComponent } from './bienvenida-proveedor/bienvenida-proveedor.component';
import { RouterModule } from '@angular/router';
import { BienvenidaUsuarioComponent } from './bienvenida-usuario/bienvenida-usuario.component';
import { BienvenidaAdminComponent } from './bienvenida-admin/bienvenida-admin.component';

@NgModule({
  declarations: [
    BienvenidaProveedorComponent,
    BienvenidaUsuarioComponent,
    BienvenidaAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashBoardModule { }
