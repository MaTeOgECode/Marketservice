export interface Usuario {
    uid: string;
    email: string;
    rol: 'usuario' | 'proveedor' | 'admin';
    Activo: boolean;
}