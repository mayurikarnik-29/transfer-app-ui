import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';
import { getTransactions } from '../store/actions/transaction.actions'


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = []
  constructor(private store: Store<{ transaction: any }>) { }

  ngOnInit(): void {
    this.transactions$ = this.store.pipe(select('transaction'));
    this.store.dispatch(getTransactions());
  }
}
