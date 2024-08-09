import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantDto } from '../../home/components/registration/models';
import { ParticipantService } from '../../home/services/participant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, NgbPagination, FormsModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent implements OnInit {

  participants: ParticipantDto[];
  total: number;
  pageSize: number = 5;
  page: number = 0;

  constructor(
    private participantService: ParticipantService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable() {
    // backend uses page 0 indexed, while bootstrap table uses page 1 indexed
    this.participantService.getParticipantsPagination(this.page-1, this.pageSize).subscribe({
      next: res => {
        this.total = res.total;
        this.page = res.page+1;
        this.pageSize = res.pageSize;
        this.participants = res.items;
      }
    });
  }

  onContinue(){
    this.router.navigate([""]);
  }

}
