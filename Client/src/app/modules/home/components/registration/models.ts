import { FormControl } from "@angular/forms";

export interface RegistrationForm {  
    companyName?: FormControl<string>;
    cedula?: FormControl<string>;
    name?: FormControl<string>;
    title?: FormControl<string>;
    email?: FormControl<string>;
    phone?: FormControl<string>;
    terms?: FormControl<boolean>;
}

export interface RegisterDto {  
    companyName: string;
    cedula: string;
    name:  string;
    title: string;
    email: string;
    phone: string;
}

export interface CedulaInfoDto {
    items: Array<CedulaDto>;
}

export interface CedulaDto {
    anioreg: number;
    desins: string;
    idCedula: string;
    materno: string;
    paterno: string;
    nombre: string;
    titulo: string;
}

export interface CedulaTable {
    anioreg: number;
    institucion: string;
    idCedula: string;
    nombreCompleto: string;
    titulo: string;
}

export interface ParticipantDto
{
    participantId: number;
    companyName: string;
    cedula: string;
    name: string;
    title: string;
    email: string;
    phone: string;
}

export interface CedulaSearchDto {
    maxResult?: string;
    idCedula: string;
    nombre?: string;
    materno?: string;
    paterno?: string;
}