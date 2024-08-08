import { AfterViewInit, Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CedulaTable, RegistrationForm, CedulaSearchDto } from './models';
import { CommonModule } from '@angular/common';
import { ReadingModalComponent } from '../../../../shared/components/reading-modal/reading-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CedulaListModalComponent } from './cedula-list-modal/cedula-list-modal.component';
import { CedulaService } from '../../services/cedula.service';
import { firstValueFrom } from 'rxjs';

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
    private cedulaService: CedulaService
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

  async openCedulaListModal() {
    let cedula = this.cedula.value;
    let search : CedulaSearchDto = {
      idCedula : cedula
    };
    let data =  await firstValueFrom(this.cedulaService.searchCedula(search));
    let dataTable = data.items.map( d => {
      let table : CedulaTable = {
        anioreg: d.anioreg,
        institucion: d.desins.toUpperCase(),
        nombreCompleto: [d.nombre, d.paterno, d.materno].join(" ").toUpperCase().trim(),
        titulo: d.titulo.toUpperCase(),
        idCedula: d.idCedula
      }
      return table;
    });
    if(dataTable.length == 1){
      this.registration.patchValue({"cedula" : dataTable[0].idCedula, "name": dataTable[0].nombreCompleto, "title": dataTable[0].titulo});
      return;
    }
		const modalRef = this.modalService.open(CedulaListModalComponent, {
      size: "lg",
    });
		modalRef.componentInstance.cedulas = dataTable;
    modalRef.result.then( (res: CedulaTable) => {
      if (!!res?.idCedula) {
        this.registration.patchValue({"cedula" : res.idCedula, "name": res.nombreCompleto, "title": res.titulo});
      } else {
        this.registration.patchValue({"name": "", "title": ""});
      }
    })
	}

  onSubmit(){
    console.log(this.registration.value);
    console.log(this.registration.invalid);
  }

}
