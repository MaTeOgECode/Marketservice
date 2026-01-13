import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaProveedorComponent } from './modules/dash_board/bienvenida-proveedor/bienvenida-proveedor.component';
import { BienvenidaUsuarioComponent } from './modules/dash_board/bienvenida-usuario/bienvenida-usuario.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { BienvenidaAdminComponent } from './modules/dash_board/bienvenida-admin/bienvenida-admin.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bienvenidausuario', component: BienvenidaUsuarioComponent },
  { path: 'bienvenidadproveedor', component: BienvenidaProveedorComponent },
  { path: 'bienvenidaadmin', component: BienvenidaAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }