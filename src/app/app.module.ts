import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environments';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { BienvenidaUsuarioComponent } from './modules/dash_board/bienvenida-usuario/bienvenida-usuario.component';
import { BienvenidaAdminComponent } from './modules/dash_board/bienvenida-admin/bienvenida-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    BienvenidaUsuarioComponent,
    BienvenidaAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
