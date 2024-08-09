import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reading-modal',
  standalone: true,
  imports: [],
  templateUrl: './reading-modal.component.html',
  styleUrl: './reading-modal.component.scss'
})
export class ReadingModalComponent {

  activeModal = inject(NgbActiveModal);

  @Input() body: string = "Body";
  @Input() title: string = "Header";
  @Input() buttonAction: string = "Cerrar";

  constructor(){
  }
}
