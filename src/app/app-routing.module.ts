import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { UserService } from './services/user.service';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'user', component: UserService }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
