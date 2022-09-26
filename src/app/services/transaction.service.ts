import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:3000';

  getTransactions() {
    return this.http.get(this.rootURL + '/transactions');
  }

  addTransaction(body: any) {
    return this.http.post(this.rootURL + '/transactions', body);
  }

  editTransaction(transactionId: any, body: any) {
    return this.http.put(`${this.rootURL}/transactions/${transactionId}`, body);
  }

  deleteTransaction(transactionId: any) {
    console.log('deleting Transaction:::', transactionId);
    return this.http.delete(`${this.rootURL}/transactions/${transactionId}`);
  }
}
