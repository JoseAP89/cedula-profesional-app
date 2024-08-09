import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CedulaTable, RegistrationForm, CedulaSearchDto, ParticipantDto } from './models';
import { CommonModule } from '@angular/common';
import { ReadingModalComponent } from '../../../../shared/components/reading-modal/reading-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CedulaListModalComponent } from './cedula-list-modal/cedula-list-modal.component';
import { CedulaService } from '../../services/cedula.service';
import { finalize, firstValueFrom, tap } from 'rxjs';
import { ParticipantService } from '../../services/participant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements AfterViewInit {

  registration : FormGroup<RegistrationForm>;
  private modalService = inject(NgbModal);
  @ViewChild("SubmitButton", {read: ElementRef}) submitButton: ElementRef;
  @ViewChild("cedulaInput", {read: ElementRef}) cedulaInput: ElementRef;
  @ViewChild("nameInput", {read: ElementRef}) nameInput: ElementRef;
  @ViewChild("titleInput", {read: ElementRef}) titleInput: ElementRef;
  hasSelectedCedula: boolean;

  constructor(
    private cedulaService: CedulaService,
    private participantService: ParticipantService,
    private router: Router
  ){
    this.hasSelectedCedula = false;
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
  ngAfterViewInit(): void {
    let btn2: HTMLButtonElement = this.nameInput.nativeElement;
    let btn3: HTMLButtonElement = this.titleInput.nativeElement;
    btn2.disabled = true;
    btn3.disabled = true;
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

  openCreatedParticipantModal() {
		const modalRef = this.modalService.open(ReadingModalComponent);
    let data = [
      `<li>Compañia: ${this.companyName.value}</li>`,
      `<li>Cédula: ${this.cedula.value}</li>`,
      `<li>Nombre: ${this.name.value}</li>`,
      `<li>Titulo: ${this.title.value}</li>`,
      `<li>Correo electronico: ${this.email.value}</li>`,
      `<li>Teléfono: ${this.phone.value}</li>`,
    ]
		modalRef.componentInstance.body = `
      <ul style='margin-left:8px;'>
      ${data.join("")}
      </ul> 
    `;
		modalRef.componentInstance.title = 'Participante guardado exitosamente';
		modalRef.componentInstance.buttonAction = 'Continuar';
    modalRef.closed.subscribe( ()=> {
      this.disableCedulaFuncionality(false);
      this.registration.reset();
      this.router.navigate(["records"]);
    })
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
      this.disableCedulaFuncionality(true);
      return;
    }
		const modalRef = this.modalService.open(CedulaListModalComponent, {
      size: "lg",
    });
		modalRef.componentInstance.cedulas = dataTable;
    modalRef.result.then( (res: CedulaTable) => {
      if (!!res?.idCedula) {
        this.disableCedulaFuncionality(true);
        this.registration.patchValue({"cedula" : res.idCedula, "name": res.nombreCompleto, "title": res.titulo});
      } else {
        this.disableCedulaFuncionality(false);
      }
    })
	}

  disableCedulaFuncionality(action: boolean){
    let btn1: HTMLButtonElement = this.cedulaInput.nativeElement;
    btn1.disabled = action;
    this.hasSelectedCedula = action;
    if (!action) {
      this.registration.patchValue({ "name": "", "title": "", "cedula": "" });
    }
  }

  onSubmit(){
    let btn : HTMLButtonElement = this.submitButton.nativeElement;
    let participantDto: ParticipantDto = {
      companyName: this.companyName.value,
      cedula: this.cedula.value,
      name: this.name.value,
      title: this.title.value,
      email: this.email.value,
      phone: this.phone.value,
    }
    this.participantService.addParticipant(participantDto)
      .pipe(
        tap(() => {
          btn.disabled = true;
        }),
        finalize( () => {
          btn.disabled = false;
        })
      ).subscribe({
        next: _res => {
          this.openCreatedParticipantModal();
        }
      })

  }

}
