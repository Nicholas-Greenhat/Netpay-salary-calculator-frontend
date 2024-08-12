import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  grossPay: number = 0;
  nonCashBenefits: number = 0;
  pensionContribution: number = 0;
  otherDeductions: number = 0;
  netPay: number | null = null;
  showEntryScreen: boolean = true;

  constructor(private http: HttpClient) { }

  calculate() {
    const requestData = {
      grossPay: this.grossPay,
      nonCashBenefits: this.nonCashBenefits,
      pensionContribution: this.pensionContribution,
      otherDeductions: this.otherDeductions
    };

    // Make a POST request to the backend
    this.http.post<{ netPay: number }>('http://localhost:3000/calculate-net-pay', requestData)
      .subscribe(response => {
        this.netPay = response.netPay;
        this.showEntryScreen = false;
      });
  }

  reset() {
    this.clearAll();
    this.showEntryScreen = true;
  }

  clearAll() {
    this.grossPay = 0;
    this.nonCashBenefits = 0;
    this.pensionContribution = 0;
    this.otherDeductions = 0;
    this.netPay = null;
  }
}
