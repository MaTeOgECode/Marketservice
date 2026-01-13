import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaProveedorComponent } from './modules/dash_board/bienvenida-proveedor/bienvenida-proveedor.component';
import { BienvenidaUsuarioComponent } from './modules/dash_board/bienvenida-usuario/bienvenida-usuario.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { BienvenidaAdminComponent } from './modules/dash_board/bienvenida-admin/bienvenida-admin.component';
import { CambiarRolComponent } from './modules/dash_board/bienvenida-admin/cambiar-rol/cambiar-rol.component';
import { DesactivarUsuarioComponent } from './modules/dash_board/bienvenida-admin/desactivar-usuario/desactivar-usuario.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'bienvenidaadmin', component: BienvenidaAdminComponent, children: [
      { path: 'cambiar-rol', component: CambiarRolComponent },
      { path: 'desactivar-usuario', component: DesactivarUsuarioComponent },
    ]
  },
  { path: "bienvenidausuario", component: BienvenidaUsuarioComponent },
  { path: "bienvenidadproveedor", component: BienvenidaProveedorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }