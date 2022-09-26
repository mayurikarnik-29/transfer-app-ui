import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';

import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent - Create Mode', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionFormComponent],
      imports: [IonicModule.forRoot(), MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () => {
    component.close(false);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});

describe('TransactionFormComponent - Edit Mode', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  const mockData = {
    "IBAN": "DE12500105170648489890",
    "account_holder": "Test Account",
    "amount": "4532",
    "date": "2022-09-29T18:30:00.000Z",
    "id": "ce60bec9-72c9-40e7-8bab-18d29c5aa9f5",
    "note": "Test note"
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionFormComponent],
      imports: [IonicModule.forRoot(), MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockData,
        },
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
