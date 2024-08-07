import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegistrationForm } from './models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  registration : FormGroup<RegistrationForm>;

  constructor(
  ){
    this.registration = new FormGroup<RegistrationForm>({
      companyName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      cedula: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      phone: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern('^\\d+$')]}),
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


  onSubmit(){
    console.log(this.registration.value);
    console.log(this.registration.invalid);
  }

}
