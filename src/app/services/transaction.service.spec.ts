import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getTransaction', () => {
    service.getTransactions().subscribe(result => expect(result).toEqual({}));
  });

  it('should addTransaction', () => {
    service.addTransaction({}).subscribe(result => expect(result).toEqual({}));
  });

  it('should editTransaction', () => {
    service.editTransaction('testid', {}).subscribe(result => expect(result).toEqual({}));
  });

  it('should deletetransaction', () => {
    service.deleteTransaction('testid').subscribe(result => expect(result).toEqual({}));
  });
});
