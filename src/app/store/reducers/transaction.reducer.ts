import { Action, createReducer, on } from '@ngrx/store';
import { Transaction } from '../../interfaces/transaction.interface';
import * as transactionAction from '../actions/transaction.actions';
import * as _ from 'lodash'

export interface State {
    transaction?: Transaction[];
    currentTransaction?: Transaction;
    deleteTransactionId?: any;
    result?: any;
    isLoading?: boolean;
    isLoadingSuccess?: boolean;
    isLoadingFailure?: boolean;
}

export const initialState: State = {
    transaction: [],
    currentTransaction: undefined,
    deleteTransactionId: '',
    result: '',
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false
};

const transactionReducer = createReducer(
    initialState,

    // Get Transactions
    on(transactionAction.getTransactions, (state) => ({ ...state, isLoading: true })),
    on(transactionAction.getTransactionsSuccess, (state, result) => ({ transaction: result.response, isLoading: false, isLoadingSuccess: true })),

    // Create Transaction Reducers
    on(transactionAction.createTransaction, (state, { transaction }) => ({ ...state, isLoading: true, currentTransaction: transaction })),
    on(transactionAction.createTransactionSuccess, (state, result) => {
        const transaction = undefined !== state.transaction ? _.cloneDeep(state.transaction) : [];
        const currentTransaction = undefined !== state.currentTransaction ? _.cloneDeep(state.currentTransaction) : {};
        currentTransaction.id = result.transactionId;
        transaction.push(currentTransaction);
        return {
            transaction,
            isLoading: false,
            isLoadingSuccess: true
        };
    }),

    // Delete Transaction Reducers
    on(transactionAction.deleteTransaction, (state, { transactionId }) => ({ ...state, isLoading: true, deleteTransactionId: transactionId })),
    on(transactionAction.deleteTransactionSuccess, (state, result) => {
        let transaction = undefined !== state.transaction ? _.cloneDeep(state.transaction) : [];
        if (result.status) {
            transaction = transaction.filter(transaction => transaction.id !== state.deleteTransactionId);
        }
        return {
            transaction,
            isLoading: false,
            isLoadingSuccess: true
        };
    }),

    // Edit Transaction Reducers
    on(transactionAction.editTransaction, (state, { transaction }) => ({ ...state, isLoading: true, currentTransaction: transaction })),
    on(transactionAction.editTransactionSuccess, (state, result) => {
        let transaction = undefined !== state.transaction ? _.cloneDeep(state.transaction) : [];
        const currentTransaction = undefined !== state.currentTransaction ? _.cloneDeep(state.currentTransaction) : {};
        transaction = transaction.map(trans => {
            if (trans.id === currentTransaction.id) {
                trans = currentTransaction;
            }
            return trans;
        });
        return {
            transaction,
            isLoading: false,
            isLoadingSuccess: true
        };
    })
);

export function reducer(state: State | undefined, action: Action): any {
    return transactionReducer(state, action);
}

export const getTransactions = (state: State) => {
    return {
        transaction: state.transaction,
        isLoading: state.isLoading,
        isLoadingSuccess: state.isLoadingSuccess
    };
};