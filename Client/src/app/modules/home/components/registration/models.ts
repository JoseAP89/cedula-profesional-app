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