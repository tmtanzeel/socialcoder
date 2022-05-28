import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionListService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getProfessionList(): Observable<any> {
    return this._httpClient.get('../assets/professions.json');
  }
}
