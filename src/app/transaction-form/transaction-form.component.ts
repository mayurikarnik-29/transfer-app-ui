import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidatorService } from 'angular-iban';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {

  transactionFormGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialogRef<TransactionFormComponent>,
  ) { }

  ngOnInit() {
    this.transactionFormGroup = new FormGroup({
      id: new FormControl(this.data?.id ? this.data.id : null),
      account_holder: new FormControl(this.data?.account_holder ? this.data.account_holder : null, [Validators.required]),
      date: new FormControl(this.data?.date ? this.data.date : null, [Validators.required]),
      IBAN: new FormControl(this.data?.IBAN ? this.data.IBAN : null, [Validators.required, ValidatorService.validateIban]),
      amount: new FormControl(this.data?.amount ? this.data.amount : null, [Validators.required, Validators.maxLength(8), Validators.minLength(2), Validators.pattern(/^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/)]),
      note: new FormControl(this.data?.note ? this.data.note : null),
    });
  }
  close(value: boolean) {
    return this.dialog.close({ save: value, data: this.transactionFormGroup.value });
  }

}
