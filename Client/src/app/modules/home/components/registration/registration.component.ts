import { AfterViewInit, Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CedulaTable, RegistrationForm } from './models';
import { CommonModule } from '@angular/common';
import { ReadingModalComponent } from '../../../../shared/components/reading-modal/reading-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CedulaListModalComponent } from './cedula-list-modal/cedula-list-modal.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent{

  registration : FormGroup<RegistrationForm>;
  private modalService = inject(NgbModal);

  constructor(
  ){
    this.registration = new FormGroup<RegistrationForm>({
      companyName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      cedula: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      phone: new FormControl('', {nonNullable: true, validators: [
        Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^\\d+$')
      ]}),
      terms: new FormControl( false, {nonNullable: true, validators: [Validators.required, Validators.requiredTrue]}),
    });
  }


  get companyName() {
    return this.registration.get("companyName");
  }
  get cedula() {
    return this.registration.get("cedula");
  }
  get name() {
    return this.registration.get("name");
  }
  get title() {
    return this.registration.get("title");
  }
  get email() {
    return this.registration.get("email");
  }
  get phone() {
    return this.registration.get("phone");
  }
  get terms() {
    return this.registration.get("terms");
  }

  openReadingModal() {
		const modalRef = this.modalService.open(ReadingModalComponent);
		modalRef.componentInstance.body = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero sint doloremque placeat. Dolore asperiores mollitia, minima quia ipsa quod cupiditate ad dolorum repellendus qui laudantium provident repudiandae quidem nesciunt magni placeat et doloremque sunt? Omnis, adipisci! Quibusdam voluptatum magni dolorem obcaecati maxime laudantium dignissimos consequuntur reprehenderit voluptates, quidem itaque animi?';
		modalRef.componentInstance.title = 'Aviso de Privacidad/Terminos y condiciones';
	}

  openCedulaListModal() {
		const modalRef = this.modalService.open(CedulaListModalComponent, {
      size: "lg",
    });
		modalRef.componentInstance.cedulas = [
      { anioreg: 2021, institucion: "UNAM", idCedula: "1", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "2", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "3", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "4", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "5", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "6", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "7", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "8", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "10", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "11", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "12", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "13", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "14", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "15", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "16", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "17", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "18", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "19", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "20", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "21", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
      { anioreg: 2021, institucion: "UNAM", idCedula: "22", nombreCompleto: "Jose Alvarez", titulo: "LIC EN ECO"},
    ]
    modalRef.result.then( (res: CedulaTable) => {
      if (!!res?.idCedula) {
        this.registration.patchValue({"cedula" : res.idCedula, "name": res.nombreCompleto, "title": res.titulo});
      }
    })
	}

  onSubmit(){
    console.log(this.registration.value);
    console.log(this.registration.invalid);
  }

}
