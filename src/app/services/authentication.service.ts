import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EnvironmentInjector } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authentication: AngularFireAuth, private userService: UserService, private environment: EnvironmentInjector) { }
  async register(email: string, password: string) {
    try {
      const credenciales = await this.authentication.createUserWithEmailAndPassword(email, password);
      const uid = credenciales.user?.uid;
      await this.userService.crearUsuario(uid!, email, 'user');
      return credenciales;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }
  login(email: string, password: string) {
    return this.authentication.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.authentication.signOut();
  }
  obtenerUsuario(uid: string) {
    return this.userService.obtenerUsuario(uid);
  }
}
