import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
  selector: 'tamin-otp',
  templateUrl: './otp.html',
  styleUrls: ['./otp.scss'],
  host: {
    '[tabIndex]': 'disableControl || disabled ? -1 : 0',
    '(focusin)': 'onHostFocusIn()',
    '[class.input-host]': 'border',
    '[class.input-host-unborder]': '!border',
    '[class.disabled]': 'disabled || disableControl',
    '[class.full-border]': 'border'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TaminOtp,
      multi: true,
    }
  ],
})

export class TaminOtp implements ControlValueAccessor {

  @ViewChildren('inputEl') inputEls!: QueryList<ElementRef<HTMLInputElement>>;
  @Input() border = true;
  @Input() clearInput = false;
  @Input() disableControl = false;
  @Input() label: string = 'pet';
  @Input() placeholder = '';
  @Input() type = 'tel';
  @Input() information: string = '1414';
  @Input() actionInfo = false;
  @Input() integer = true;
  private _value: string | null = null;

  @Output() taminChange = new EventEmitter();
  @Output() taminInfo = new EventEmitter();
  disabled: boolean = false;
   _size = 6;
  private _scheduledFocus: number | null = null;
  inputs: FormArray<FormControl<string>> = this.getFormArray(this._size);

  @Input()
  set size(size: number) {
    this.inputs = this.getFormArray(size);
    this._size = size;
  }

  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};


  handleInput() {
    this.updateWriteValue();
    if (this._scheduledFocus !== null) {
      this.focusInput(this._scheduledFocus);
      this._scheduledFocus = null;
    }
  }

  handleKeyPress(e: KeyboardEvent, idx: number) {
    const isDigit = /\d/.test(e.key);
    if (e.key === 'delete' || e.key === 'Backspace') {
      if (idx > 0) {
        this._scheduledFocus = idx - 1;
      }
      return
    }
    if (e.ctrlKey && e.key === 'v') {
      return
    }
    if (e.key === 'v' && e.metaKey) {
      return true;
    }
    if ((this.integer && isDigit || !this.integer) && idx + 1 < this._size) {
      this._scheduledFocus = idx + 1;
    }
    if ((this.integer && isDigit || !this.integer) && this.inputs.controls[idx].value) {
      this.inputs.controls[idx].setValue('');
    }
    if(!this.integer) {
      return true
    }
    return isDigit;
  }

  handlePaste(e: ClipboardEvent, idx: number) {
    e.preventDefault();
    const regex = new RegExp(`\\d{${this._size}}`);
    if (idx !== 0) return;
    const pasteData = e.clipboardData ? e.clipboardData?.getData('text') : null;
      if (!pasteData || (this.integer && !regex.test(pasteData))) return;
      [...pasteData].map((val: string, index: number) =>this.inputs.controls[index].setValue(val))
      this.focusInput(this.inputEls.length - 1);
      this.updateWriteValue();
      this.onTouched()

  }

  handleFocus(e: FocusEvent) {
    (e.target as HTMLInputElement).select();
  }

  private focusInput(idx: number) {
    const inputEl = this.inputEls.get(idx)
    if(inputEl) inputEl.nativeElement.focus();
  }

  private updateWriteValue() {
    if (!this.inputs.value.includes('')) {
      this._value = this.inputs.value.join('')
      this.onChange(this._value);
      this.taminChange.emit(this._value)
    } if (this.inputs.value.every(i => i === '')) {
      this._value = null;
      this.onChange(null);
      this.taminChange.emit(null)
    }

  }

  getFormArray(size: number): FormArray {
    const arr: FormControl[] = [];
    for (let i = 0; i < size; i++) {
      arr.push(new FormControl(''));
    }
    return new FormArray(arr);
  }

  onHostFocusIn() {
    if (!this.disabled && !this.disableControl) {
      this.onTouched();
    }
  }


  writeValue(value: string): void {
    [...value].map((val: string, index: number) =>this.inputs.controls[index].setValue(val))
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }


  informationEvent(info: string) {
    if (this.actionInfo) {
      this.taminInfo.emit(info);
    }
  }

}
