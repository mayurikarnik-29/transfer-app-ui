import { createAction, props } from '@ngrx/store';
// import { Transaction } from '../entity';

export const GET_TRANSACTIONS = '[Transaction] Get Transactions';
export const GET_TRANSACTIONS_SUCCESS = '[Transaction] Get Transactions Success';
export const GET_TRANSACTIONS_FAILURE = '[Transaction] Get Transactions Failure';

export const CREATE_TRANSACTION = '[Transaction] Create Transaction';
export const CREATE_TRANSACTION_SUCCESS = '[Transaction] Create Transaction Success';
export const CREATE_TRANSACTION_FAILURE = '[Transaction] Create Transaction Failure';

export const DELETE_TRANSACTION = '[Transaction] Delete Transaction';
export const DELETE_TRANSACTION_SUCCESS = '[Transaction] Delete Transaction Success';
export const DELETE_TRANSACTION_FAILURE = '[Transaction] Delete Transaction Failure';

export const EDIT_TRANSACTION = '[Transaction] Edit Transaction';
export const EDIT_TRANSACTION_SUCCESS = '[Transaction] Edit Transaction Success';
export const EDIT_TRANSACTION_FAILURE = '[Transaction] Edit Transaction Failure';


export const getTransactions = createAction(
    GET_TRANSACTIONS
);

export const getTransactionsSuccess = createAction(
    GET_TRANSACTIONS_SUCCESS,
    props<any>()
);

export const getTransactionsFailure = createAction(
    GET_TRANSACTIONS_FAILURE,
    props<{ any }>()
);

export const createTransaction = createAction(
    CREATE_TRANSACTION,
    props<{ transaction: any }>()
);

export const createTransactionSuccess = createAction(
    CREATE_TRANSACTION_SUCCESS,
    props<any>()
);

export const createTransactionFailure = createAction(
    CREATE_TRANSACTION_FAILURE,
    props<{ any }>()
);

export const deleteTransaction = createAction(
    DELETE_TRANSACTION,
    props<{ transactionId }>()
);

export const deleteTransactionSuccess = createAction(
    DELETE_TRANSACTION_SUCCESS,
    props<any>()
);

export const deleteTransactionFailure = createAction(
    DELETE_TRANSACTION_FAILURE,
    props<{ any }>()
);

export const editTransaction = createAction(
    EDIT_TRANSACTION,
    props<{ transactionId: string, transaction: any }>()
);

export const editTransactionSuccess = createAction(
    EDIT_TRANSACTION_SUCCESS,
    props<any>()
);

export const editTransactionFailure = createAction(
    EDIT_TRANSACTION_FAILURE,
    props<{ any }>()
);