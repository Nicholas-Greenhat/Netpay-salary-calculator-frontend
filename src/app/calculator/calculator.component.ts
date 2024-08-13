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

  // Add these to display on the output screen
  nssfTierI: number = 420.00;
  nssfTierII: number = 1740.00;
  nhif: number = 1600.00;
  payeTax: number = 0;

  constructor(private http: HttpClient) { }

  calculate() {
    const taxableIncome = this.grossPay - this.pensionContribution - this.otherDeductions;
    this.payeTax = this.calculatePayeTax(taxableIncome);

    // Now make the request to the backend to get any additional calculations
    const requestData = {
      grossPay: this.grossPay,
      nonCashBenefits: this.nonCashBenefits,
      pensionContribution: this.pensionContribution,
      otherDeductions: this.otherDeductions,
      payeTax: this.payeTax
    };

    this.http.post<{ netPay: number }>('http://localhost:3000/calculate-net-pay', requestData)
      .subscribe(response => {
        this.netPay = response.netPay;
        this.showEntryScreen = false;
      });
  }

  calculatePayeTax(income: number): number {
    let tax = 0;
    if (income <= 24000) {
      tax = income * 0.10;
    } else if (income <= 32333) {
      tax = (24000 * 0.10) + ((income - 24000) * 0.25);
    } else {
      tax = (24000 * 0.10) + ((32333 - 24000) * 0.25) + ((income - 32333) * 0.30);
    }
    return tax;
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
    this.payeTax = 0;
  }
}
