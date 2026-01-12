import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private authentication: AngularFireAuth,
    private userService: UserService
  ) {}

  async register(
    email: string,
    password: string,
    rol: 'user' | 'proveedor' | 'admin'
  ) {
    try {
      const credenciales = await this.authentication
        .createUserWithEmailAndPassword(email, password);

      const uid = credenciales.user?.uid;
      if (!uid) throw new Error('UID no generado');

      await this.userService.crearUsuario(uid, email, rol);

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
}