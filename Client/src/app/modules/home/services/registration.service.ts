import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParticipantDto } from '../components/registration/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = environment.api_url + "/api/participant";
  constructor(
    private http: HttpClient,
  ) { }

  public addParticipant(participant: ParticipantDto): Observable<ParticipantDto> {
    const url = `${this.baseUrl}`;
    return this.http.post<ParticipantDto>(url, participant);
  }

}
