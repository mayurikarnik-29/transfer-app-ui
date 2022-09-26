import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Transaction } from '../interfaces/transaction.interface';
import { getTransactions, createTransaction, deleteTransaction, editTransaction } from '../store/actions/transaction.actions';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  columns = [
    {
      columnDef: "id",
      header: "id",
      displayFilter: false,
      cell: (element: any) => `${element.id}`,
      hidden: true,
      sort: false
    },
    {
      columnDef: "account_holder",
      header: "Account Holder",
      displayFilter: true,
      cell: (element: any) => `${element.account_holder}`,
      hidden: false,
      sort: false
    },
    {
      columnDef: "IBAN",
      header: "IBAN",
      displayFilter: false,
      cell: (element: any) => `${element.IBAN}`,
      hidden: false,
      sort: false
    },
    {
      columnDef: "date",
      header: "Date",
      displayFilter: false,
      cell: (element: any) => `${element.date}`,
      hidden: false,
      sort: true
    },
    {
      columnDef: "amount",
      header: "Amount",
      displayFilter: false,
      cell: (element: any) => `${element.amount}`,
      hidden: false,
      sort: true
    },
    {
      columnDef: "note",
      header: "Note",
      displayFilter: true,
      cell: (element: any) => `${element.note}`,
      hidden: false,
      sort: false
    }
  ]
  displayedColumns = this.columns.map(c => c.columnDef).concat(['actions']);
  dataSource = new MatTableDataSource<Transaction>();
  filterValues = {
    account_holder: "",
    note: "",
  };
  filterForm;
  editMode: boolean = false;
  loading: boolean;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<{ transaction: any }>, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(getTransactions())
    this.store.pipe(select('transaction'))
      .subscribe(response => {
        this.dataSource.data = response.transaction;
        this.loading = response.isLoading;
      }
      );
    this.dataSource.filterPredicate = this.createFilter();
    this.filterForm = this.fb.group({
      account_holder: [""],
      note: [""],
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.dataSource.filter = JSON.stringify(value);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openDialog(data?: any) {
    let dialogRef = this.dialog.open(TransactionFormComponent, {
      data: data,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.save) {
        this.store.dispatch(this.editMode ? editTransaction({ transactionId: result.id, transaction: result.data }) : createTransaction({ transaction: result.data }));
      }
      this.editMode = false;
    });
  }

  editItem(row: any) {
    this.editMode = true;
    this.openDialog(row);
  }

  deleteItem(row: any) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Confirm delete operation?' },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.save) {
        this.store.dispatch(deleteTransaction({ transactionId: row.id }))
      }
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (data.account_holder.toLowerCase().indexOf(searchTerms.account_holder) !== -1
        && data.note.toLowerCase().indexOf(searchTerms.note) !== -1
      );
    };
    return filterFunction;
  }

  public ngOnDestroy(): void { }
}
