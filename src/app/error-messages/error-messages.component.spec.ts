import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ErrorMessagesComponent } from './error-messages.component';

describe('ErrorMessagesComponent', () => {
  let component: ErrorMessagesComponent;
  let fixture: ComponentFixture<ErrorMessagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessagesComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessagesComponent);
    component = fixture.componentInstance;
    component.ctrl = new FormControl();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get value of error message - required', () => {
    fixture.detectChanges();
    const { required } = component.ERROR_MESSAGE;
    const actual = required();
    expect(actual).toEqual('This field is required');
  });

  it('should get value of error message - minlength', () => {
    fixture.detectChanges();
    const { minlength } = component.ERROR_MESSAGE;
    const actual = minlength({ requiredLength: 2 });
    expect(actual).toEqual(`Min length 2 is required`);
  });

  it('should get value of error message - maxlength', () => {
    fixture.detectChanges();
    const { maxlength } = component.ERROR_MESSAGE;
    const actual = maxlength({ requiredLength: 8 });
    expect(actual).toEqual(`Max length 8 is required`);
  });

  it('should get value of error message - iban', () => {
    fixture.detectChanges();
    const { iban } = component.ERROR_MESSAGE;
    const actual = iban();
    expect(actual).toEqual(`Invalid IBAN format`);
  });

  it('should get value of error message - pattern', () => {
    fixture.detectChanges();
    const { pattern } = component.ERROR_MESSAGE;
    const actual = pattern();
    expect(actual).toEqual(`Should contain only numbers, ',' and '.'. Max 2 decimal places allowed`);
  });

  it('should get list of error', () => {
    fixture.detectChanges();
    component.ctrl.setErrors({ required: true })
    var errors = component.listOfErrors();
    expect(errors).toEqual(['This field is required'])
  });
});
