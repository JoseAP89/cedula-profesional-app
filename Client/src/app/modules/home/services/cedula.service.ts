import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CedulaInfoDto, CedulaSearchDto, ParticipantDto } from '../components/registration/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CedulaService {

  private baseUrl = environment.api_url + "/api/cedula";
  constructor(
    private http: HttpClient,
  ) { }

  public searchCedula(search: CedulaSearchDto): Observable<CedulaInfoDto> {
    const url = `${this.baseUrl}/search`;
    return this.http.post<CedulaInfoDto>(url, search);
  }

}
