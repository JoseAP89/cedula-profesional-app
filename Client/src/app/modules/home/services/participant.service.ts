import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageContainer, ParticipantDto } from '../components/registration/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private baseUrl = environment.api_url + "/api/participant";
  constructor(
    private http: HttpClient,
  ) { }

  public addParticipant(participant: ParticipantDto): Observable<ParticipantDto> {
    const url = `${this.baseUrl}`;
    return this.http.post<ParticipantDto>(url, participant);
  }

  public getParticipantsPagination(page: number, pageSize: number): Observable<PageContainer<ParticipantDto>> {
    const url = `${this.baseUrl}/${page}/${pageSize}`;
    return this.http.get<PageContainer<ParticipantDto>>(url);
  }

}
