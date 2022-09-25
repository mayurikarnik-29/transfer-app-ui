import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';

import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { reducer } from './store/reducers/transaction.reducer';
import { TransactionEffects } from '../app/store/effects/transaction.effects';
import { EffectsModule } from '@ngrx/effects';

export const metaReducers: MetaReducer<any>[] = [];

@NgModule({
  declarations: [AppComponent, TransactionsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatTableModule, HttpClientModule, EffectsModule,
    StoreModule.forRoot({transaction: reducer}),
    EffectsModule.forRoot([TransactionEffects])],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
