import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaProveedorComponent } from './bienvenida-proveedor/bienvenida-proveedor.component';
import { RouterModule } from '@angular/router';
import { BienvenidaUsuarioComponent } from './bienvenida-usuario/bienvenida-usuario.component';
import { BienvenidaAdminComponent } from './bienvenida-admin/bienvenida-admin.component';
import { CambiarRolComponent } from './bienvenida-admin/cambiar-rol/cambiar-rol.component';
import { DesactivarUsuarioComponent } from './bienvenida-admin/desactivar-usuario/desactivar-usuario.component';

import { AgregarServiciosComponent } from './bienvenida-proveedor/agregar-servicios/agregar-servicios.component';
import { ListadeServiciosComponent } from './bienvenida-proveedor/listade-servicios/listade-servicios.component';
import { ServiciosContratadosComponent } from './bienvenida-usuario/servicios-contratados/servicios-contratados.component';
import { SeleccionEmpresasComponent } from './bienvenida-usuario/seleccion-empresas/seleccion-empresas.component';

@NgModule({
  declarations: [
    BienvenidaProveedorComponent,
    BienvenidaUsuarioComponent,
    BienvenidaAdminComponent,
    CambiarRolComponent,
    DesactivarUsuarioComponent,
  
    AgregarServiciosComponent,
    ListadeServiciosComponent,
    ServiciosContratadosComponent,
    SeleccionEmpresasComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashBoardModule { }
