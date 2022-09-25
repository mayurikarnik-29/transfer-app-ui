import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import * as transactionActions from '../actions/transaction.actions';

@Injectable()
export class TransactionEffects {

    constructor(
        private actions$: Actions,
        private transactionService: TransactionService
    ) { }

    getTransactions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionActions.getTransactions),
            exhaustMap(action =>
                this.transactionService.getTransactions().pipe(
                    map(response => {
                        console.log("response:::", response)
                        return transactionActions.getTransactionsSuccess({ response })
                    }),
                    catchError((error: any) => of(transactionActions.getTransactionsFailure(error))))
            )
        )
    );

    createTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionActions.createTransaction),
            exhaustMap(action =>
                this.transactionService.addTransaction(action.transaction).pipe(
                    map(response => transactionActions.createTransactionSuccess(response)),
                    catchError((error: any) => of(transactionActions.createTransactionFailure(error))))
            )
        )
    );


    deleteTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionActions.deleteTransaction),
            exhaustMap(action => this.transactionService.deleteTransaction(action.transactionId).pipe(
                map(response => transactionActions.deleteTransactionSuccess(response)),
                catchError((error: any) => of(transactionActions.deleteTransactionFailure(error))))
            )
        )
    );

    editTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionActions.editTransaction),
            exhaustMap(action =>
                this.transactionService.editTransaction(action.transactionId, action.transaction).pipe(
                    map(response => transactionActions.editTransactionSuccess(response)),
                    catchError((error: any) => of(transactionActions.editTransactionFailure(error))))
            )
        )
    );

}