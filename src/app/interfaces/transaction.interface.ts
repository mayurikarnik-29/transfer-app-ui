export interface Transaction {
    id: string;
    account_holder: string;
    IBAN: string;
    amount: string;
    date: Date;
    note: string
}