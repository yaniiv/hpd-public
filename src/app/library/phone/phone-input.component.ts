import {FocusMonitor} from '@angular/cdk/a11y';
import { coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  Validators
} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';

export class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string
  ) {}
}

@Component({
  selector: 'phone-input',
  templateUrl: 'phone-input.component.html',
  styleUrls: ['phone-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: TelInput }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class TelInput
  implements ControlValueAccessor, MatFormFieldControl<MyTel>, OnDestroy {

  get empty() {
    const {
      value: { area, exchange, subscriber }
    } = this.parts;

    return !area && !exchange && !subscriber;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  @Input()
  get value(): MyTel | null {
    if (this.parts.valid) {
      const {
        value: { area, exchange, subscriber }
      } = this.parts;
      return new MyTel(area, exchange, subscriber);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    const { area, exchange, subscriber } = tel || new MyTel('', '', '');
    this.parts.setValue({ area, exchange, subscriber });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      area: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      exchange: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      subscriber: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ]
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  static nextId = 0;

  @ViewChild('area') areaInput: HTMLInputElement;
  @ViewChild('exchange') exchangeInput: HTMLInputElement;
  @ViewChild('subscriber') subscriberInput: HTMLInputElement;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'phone-input';
  id = `phone-input-${TelInput.nextId++}`;

  @Input('aria-describedby') userAriaDescribedBy: string;
  private _placeholder: string;
  private _required = false;
  private _disabled = false;
  onChange = (_: any) => {};
  onTouched = () => {};

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef as any);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.phone-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.subscriber.valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls.exchange.valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls.area.valid) {
      this._focusMonitor.focusVia(this.exchangeInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }

  writeValue(tel: MyTel | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
}
