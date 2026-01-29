import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = {};
  cargando = true;
  uid: string = '';
  
  porcentajeSubida: number | undefined = 0;
  subiendoImagen = false;

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private cdr: ChangeDetectorRef // Para forzar la actualización visual
  ) {}

  async ngOnInit() {
    const user = await firstValueFrom(this.afAuth.user);
    if (user) {
      this.uid = user.uid;
      this.obtenerDatos();
    }
  }

  async obtenerDatos() {
    try {
      const doc = await this.firestore.firestore.collection('usuarios').doc(this.uid).get();
      if (doc.exists) {
        this.usuario = doc.data();
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      this.cargando = false;
    }
  }

  cambiarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.subiendoImagen = true;
      const filePath = `fotosPerfil/${this.uid}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.percentageChanges().subscribe(p => {
        this.porcentajeSubida = p;
        this.cdr.detectChanges(); // Actualiza la barra en tiempo real
      });

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async (url) => {
            // 1. Actualizamos la variable local para que se vea el cambio al instante
            this.usuario.fotoUrl = url; 
            
            // 2. Actualizamos la base de datos usando la instancia nativa (Evita NG0203)
            const db = this.firestore.firestore;
            await db.collection('usuarios').doc(this.uid).update({ fotoUrl: url });
            
            // 3. Reset de estados
            this.subiendoImagen = false;
            this.porcentajeSubida = 0;
            
            // 4. Forzamos a Angular a detectar el cambio de la URL de la imagen
            this.cdr.detectChanges(); 
            alert("Foto actualizada en tiempo real");
          });
        })
      ).subscribe();
    }
  }

  async actualizarPerfil() {
    try {
      const db = this.firestore.firestore;
      
      const datosActualizados: any = {
        nombre: this.usuario.nombre || '',
        ci: this.usuario.ci || '',
        direccion: this.usuario.direccion || ''
      };

      if (this.usuario.rol === 'proveedor') {
        datosActualizados.contacto = this.usuario.contacto || '';
        datosActualizados.especialidad = this.usuario.especialidad || '';
        datosActualizados.ubicacion = this.usuario.ubicacion || '';
      }

      await db.collection('usuarios').doc(this.uid).update(datosActualizados);
      alert("¡Perfil guardado!");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  }
}