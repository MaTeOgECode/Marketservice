export interface Resena {
  id?: string;
  servicioId: string;
  clienteId: string;
  proveedorId: string;
  contratoId: string;
  puntuacion: number; // Del 1 al 5
  comentario?: string;
  fecha: Date;
}