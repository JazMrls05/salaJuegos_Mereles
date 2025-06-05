export class Usuario{
    email: string;
    clave: string;
    alias?:string;
    fechaIngreso: any;

    constructor(email:string, clave: string, alias?: string) {
        this.email = email;
        this.clave = clave;
        this.alias = alias;
        this.fechaIngreso = new Date(); 
    }
}