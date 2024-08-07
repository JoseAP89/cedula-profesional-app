import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegistrationForm } from './models';
import { CommonModule } from '@angular/common';
import { ReadingModalComponent } from '../../../../shared/components/reading-modal/reading-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

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

  onSubmit(){
    console.log(this.registration.value);
    console.log(this.registration.invalid);
  }

}
