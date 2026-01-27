import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environments';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Módulos propios
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DashBoardModule } from './modules/dash_board/dash-board.module';

// Componentes y Servicios
import { GestionarCategoriaComponent } from './modules/dash_board/gestionar-categorias/gestionar-categorias.component';
import { CategoriaService } from './services/categoria.service'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
    AppComponent,
    GestionarCategoriaComponent, // Declarado aquí
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthenticationModule,
    DashBoardModule,
    FormsModule,
    AngularFireStorageModule, // Necesario para que [(ngModel)] funcione en categorías
  ],
  providers: [
    CategoriaService // Agregarlo aquí resuelve el error de "No suitable injection token"
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }