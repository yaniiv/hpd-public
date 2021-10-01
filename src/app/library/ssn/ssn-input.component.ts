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
import { MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';

export class MySSN {
  constructor(
    public ssnPartOne: string,
    public ssnPartTwo: string,
    public ssnPartThree: string
  ) {}
}

@Component({
  selector: 'ssn-input',
  templateUrl: 'ssn-input.component.html',
  styleUrls: ['ssn-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: SSNInput }],
  host: {
    '[class.ssn-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class SSNInput
  implements ControlValueAccessor, MatFormFieldControl<MySSN>, OnDestroy {

  get empty() {
    const {
      value: { ssnPartOne, ssnPartTwo, ssnPartThree }
    } = this.parts;

    return !ssnPartOne && !ssnPartTwo && !ssnPartThree;
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
  get value(): MySSN | null {
    if (this.parts.valid) {
      const {
        value: { ssnPartOne, ssnPartTwo, ssnPartThree }
      } = this.parts;
      return new MySSN(ssnPartOne, ssnPartTwo, ssnPartThree);
    }
    return null;
  }
  set value(tel: MySSN | null) {
    const { ssnPartOne, ssnPartTwo, ssnPartThree } = tel || new MySSN('', '', '');
    this.parts.setValue({ ssnPartOne, ssnPartTwo, ssnPartThree });
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
      ssnPartOne: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      ssnPartTwo: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)]
      ],
      ssnPartThree: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ]
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  static nextId = 0;

  @ViewChild('ssnPartOne') ssnPartOneInput: HTMLInputElement;
  @ViewChild('ssnPartTwo') ssnPartTwoInput: HTMLInputElement;
  @ViewChild('ssnPartThree') ssnPartThreeInput: HTMLInputElement;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'ssn-input';
  id = `ssn-input-${SSNInput.nextId++}`;

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
      .querySelector('.ssn-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.ssnPartThree.valid) {
      this._focusMonitor.focusVia(this.ssnPartThreeInput, 'program');
    } else if (this.parts.controls.ssnPartTwo.valid) {
      this._focusMonitor.focusVia(this.ssnPartThreeInput, 'program');
    } else if (this.parts.controls.ssnPartOne.valid) {
      this._focusMonitor.focusVia(this.ssnPartTwoInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.ssnPartOneInput, 'program');
    }
  }

  writeValue(tel: MySSN | null): void {
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
