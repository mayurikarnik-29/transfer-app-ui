import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';

import { AppRoutingModule } from './app-routing.module';

import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { reducer } from './store/reducers/transaction.reducer';
import { TransactionEffects } from '../app/store/effects/transaction.effects';
import { EffectsModule } from '@ngrx/effects';

export const metaReducers: MetaReducer<any>[] = [];

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [AppComponent, TransactionsComponent, TransactionFormComponent, ConfirmationDialogComponent, ErrorMessagesComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatTableModule, HttpClientModule, EffectsModule, MatDividerModule, MatButtonModule, MatDialogModule, MatNativeDateModule, ReactiveFormsModule, BrowserAnimationsModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatProgressSpinnerModule, MatSortModule, StoreModule.forRoot({ transaction: reducer }),
    EffectsModule.forRoot([TransactionEffects])],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }],
  bootstrap: [AppComponent],
})
export class AppModule { }
