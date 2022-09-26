import * as transactionReducer from './transaction.reducer';
import * as transactionActions from '../actions/transaction.actions';

describe('Reducer: Transaction', () => {
    it('should return the default state', () => {
        const { initialState } = transactionReducer;
        const action = { type: transactionReducer.getTransactions } as any;
        const state = transactionReducer.reducer(undefined, action);
        expect(state).toBe(initialState);
    });

    it('should set loading to true', () => {
        const { initialState } = transactionReducer;
        const action = transactionActions.getTransactions();
        const state = transactionReducer.reducer(initialState, action);
        expect(state.isLoading).toEqual(true);
    });

    it('should return the previous state', () => {
        const { initialState } = transactionReducer;
        const previousState = { ...initialState, isLoading: false };
        const action = transactionActions.getTransactionsFailure({ any: 'val' });
        const state = transactionReducer.reducer(previousState, action);
        expect(state).toEqual(initialState);
    });
});
