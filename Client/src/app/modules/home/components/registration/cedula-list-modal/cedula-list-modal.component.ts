import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { CedulaTable } from '../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-cedula-list-modal',
  standalone: true,
  imports: [CommonModule, NgbPagination, FormsModule],
  templateUrl: './cedula-list-modal.component.html',
  styleUrl: './cedula-list-modal.component.scss'
})
export class CedulaListModalComponent {

  activeModal = inject(NgbActiveModal);
  @Input() cedulas: CedulaTable[];
  cedulasFiltered: CedulaTable[];
  total: number;
  pageSize: number = 5;
  page: number = 0;
  selectedRowIdCedula: string;
  selectedRow: CedulaTable;

  constructor(){
    this.selectedRowIdCedula = "";
  }

  onSelectedRow(row: CedulaTable) {
    this.selectedRowIdCedula = row.idCedula;
    this.selectedRow = row;
  }

}
