export interface Usuario {
    uid: string;
    email: string;
    rol: 'admin' | 'usuario' | 'proveedor';
    Activo: boolean;
}