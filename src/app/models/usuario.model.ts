export interface Usuario {
    uid: string;
    email: string;
    rol: 'user' | 'proveedor' | 'admin';
    Activo: boolean;
}