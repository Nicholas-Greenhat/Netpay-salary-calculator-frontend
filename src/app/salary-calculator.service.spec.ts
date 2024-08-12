import { TestBed } from '@angular/core/testing';

import { SalaryCalculatorService } from './salary-calculator.service';

describe('SalaryCalculatorService', () => {
  let service: SalaryCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
