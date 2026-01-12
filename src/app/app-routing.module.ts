import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { BienvenidaAdminComponent } from './modules/dash_board/bienvenida-admin/bienvenida-admin.component';
import { UserService } from './services/user.service';
import { BienvenidaUsuarioComponent } from './modules/dash_board/bienvenida-usuario/bienvenida-usuario.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'user', component: UserService },
  { path: 'bienvenidausuario', component: BienvenidaUsuarioComponent },
  { path: 'bienvenidaadmin', component: BienvenidaAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
