import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
private apiURL = 'https://api.opencagedata.com/geocode/v1/json';

  constructor(private http: HttpClient) {}

  getLocationFromCoordinates(lat: number, lng: number): Observable<any> {
    const params = new HttpParams()
      .set('q', `${lat},${lng}`)
      .set('key', 'a9f490953e5441a6860c181d68a7f741');  // Reemplaza con tu clave API

    return this.http.get(this.apiURL, { params });
  }
}
