import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  API_URI: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(
    private http: HttpClient
  ) { 
    this.API_URI = environment.api_uri;
  }
  getData(uri: String, headers: any = null): any {
    headers = this.httpOptions;
    return this.http.get(this.API_URI + uri, headers);
  }
  getDataClean(uri: String, headers: any = null): any {
    headers = this.httpOptions;
    return this.http.get(''+uri, headers);
  }
}
