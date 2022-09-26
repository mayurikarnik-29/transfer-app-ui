import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { IonicModule } from '@ionic/angular';

import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { TransactionsComponent } from './transactions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { reducer } from '../store/reducers/transaction.reducer';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsComponent],
      imports: [IonicModule.forRoot(), StoreModule.forRoot({ 'transaction': reducer }), MatDialogModule, ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    component.openDialog();
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    expect(component.dialog).toBeDefined();
  });

  it('should edit item', () => {
    const row = {
      "IBAN": "DE12500105170648489890",
      "account_holder": "Test Account",
      "amount": "4532",
      "date": "2022-09-29T18:30:00.000Z",
      "id": "ce60bec9-72c9-40e7-8bab-18d29c5aa9f5",
      "note": "Test note"
    }
    component.editItem(row)
    expect(component.editMode).toBeTruthy();
  });

  it('should delete item', () => {
    const row = {
      "IBAN": "DE12500105170648489890",
      "account_holder": "Test Account",
      "amount": "4532",
      "date": "2022-09-29T18:30:00.000Z",
      "id": "ce60bec9-72c9-40e7-8bab-18d29c5aa9f5",
      "note": "Test note"
    }
    component.deleteItem(row)
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    expect(component.dialog).toBeDefined();
  });

  it('should get value of id', () => {
    fixture.detectChanges();
    const { cell } = component.columns[0];
    const actual = cell({ id: 'testid1' });
    expect(actual).toEqual('testid1');
  });

  it('should get value of account_holder', () => {
    fixture.detectChanges();
    const { cell } = component.columns[1];
    const actual = cell({ account_holder: 'testid1' });
    expect(actual).toEqual('testid1');
  });

  it('should get value of IBAN', () => {
    fixture.detectChanges();
    const { cell } = component.columns[2];
    const actual = cell({ IBAN: 'testid1' });
    expect(actual).toEqual('testid1');
  });

  it('should get value of date', () => {
    fixture.detectChanges();
    const { cell } = component.columns[3];
    const actual = cell({ date: '29.09.2022' });
    expect(actual).toEqual('29.09.2022');
  });

  it('should get value of amount', () => {
    fixture.detectChanges();
    const { cell } = component.columns[4];
    const actual = cell({ amount: '120.20' });
    expect(actual).toEqual('120.20');
  });

  it('should get value of note', () => {
    fixture.detectChanges();
    const { cell } = component.columns[5];
    const actual = cell({ note: 'test note' });
    expect(actual).toEqual('test note');
  });
});
