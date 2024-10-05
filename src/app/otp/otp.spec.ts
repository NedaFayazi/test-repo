import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaminOtp} from './otp';

describe('TaminOtp', () => {
  let component: TaminOtp;
  let fixture: ComponentFixture<TaminOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaminOtp]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaminOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
