import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaProveedorComponent } from './modules/dash_board/bienvenida-proveedor/bienvenida-proveedor.component';
import { BienvenidaUsuarioComponent } from './modules/dash_board/bienvenida-usuario/bienvenida-usuario.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { BienvenidaAdminComponent } from './modules/dash_board/bienvenida-admin/bienvenida-admin.component';
import { CambiarRolComponent } from './modules/dash_board/bienvenida-admin/cambiar-rol/cambiar-rol.component';
import { DesactivarUsuarioComponent } from './modules/dash_board/bienvenida-admin/desactivar-usuario/desactivar-usuario.component';
import { SeleccionEmpresasComponent } from './modules/dash_board/bienvenida-usuario/seleccion-empresas/seleccion-empresas.component';
import { ServiciosContratadosComponent } from './modules/dash_board/bienvenida-usuario/servicios-contratados/servicios-contratados.component';
import { AgregarServiciosComponent } from './modules/dash_board/bienvenida-proveedor/agregar-servicios/agregar-servicios.component';
import { ListadeServiciosComponent } from './modules/dash_board/bienvenida-proveedor/listade-servicios/listade-servicios.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'bienvenidaadmin', component: BienvenidaAdminComponent, children: [
      { path: 'cambiar-rol', component: CambiarRolComponent },
      { path: 'desactivar-usuario', component: DesactivarUsuarioComponent },
    ]
  },
  
  { path: "bienvenidausuario", component: BienvenidaUsuarioComponent, children: [
     {path: 'seleccion-empresas', component: SeleccionEmpresasComponent},
     {path: 'servicios-contratados', component: ServiciosContratadosComponent},
  ] },

  { path: "bienvenidadproveedor", component: BienvenidaProveedorComponent, children: [
    {path:'agregar-servicios', component: AgregarServiciosComponent},
    {path: 'listade-servicios', component: ListadeServiciosComponent},
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }