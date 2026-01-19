export interface Serviciomodels {
    id?: string;          // ID autogenerado por Firestore
    nombre: string;      // Ej: "Corte de cabello", "Limpieza de hogar"
    descripcion: string;
    precio: number;
    categoria: string;
    proveedorId: string; // UID del proveedor que crea el servicio
    imagen: string;
    fechaCreacion: Date;
    activo: boolean;     // Para que el proveedor pueda "pausar" el servicio
}
