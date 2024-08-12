import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryCalculatorService {
  private apiUrl = 'http://localhost:3000/calculate-net-pay';

  constructor(private http: HttpClient) {}

  calculateNetPay(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
