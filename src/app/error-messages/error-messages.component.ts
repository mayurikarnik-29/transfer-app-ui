import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent implements OnInit {

  @Input() ctrl: FormControl;

  ERROR_MESSAGE = {
    required: () => `This field is required`,
    minlength: (par) => `Min length ${par.requiredLength} is required`,
    maxlength: (par) => `Max length ${par.requiredLength} is required`,
    iban: () => `Invalid IBAN format`,
    pattern: () => `Should contain only numbers, ',' and '.'. Max 2 decimal places allowed`,
  };

  constructor() { }

  ngOnInit() { }

  shouldShowErrors(): boolean {
    return this.ctrl && this.ctrl.errors && this.ctrl.touched;
  }

  listOfErrors(): string[] {
    return Object.keys(this.ctrl.errors).map(
      err => this.ERROR_MESSAGE[err](this.ctrl.getError(err))
    );
  }
}
