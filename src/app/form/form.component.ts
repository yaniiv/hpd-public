import {Component,  OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from '@angular/forms';
import {SimpleChanges} from '@angular/core';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'public-web-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  basicInfoFormGroup: FormGroup;
  householdFormGroup: FormGroup;
  incomeTaxGroup: FormGroup;

  taxReturnTypes = [
    "Joint return",
    "Individual return",
    "No return filed"
  ]

  // get householdControls() { return this.householdFormGroup.controls; }
  get householdMembers() { return this.householdFormGroup.controls.members as FormArray; }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.basicInfoFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      building: ['', Validators.required],
      aptNumber: ['', Validators.required],
      ssn: ['', Validators.required]
    });

    this.householdFormGroup = this._formBuilder.group({
      hasMultipleHouseMembers:  [false, Validators.required],
      numHouseMembers:  [0, Validators.required],
      members: new FormArray([
        this._formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          age: ['', Validators.required],
          relation: ['', Validators.required],
          income: ['' , Validators.required],
          taxReturnType: ['' , Validators.required]
        })
      ]),

    });
    this.incomeTaxGroup = this._formBuilder.group({
      incomeAndTax: ['', Validators.required]
    });

    this.basicInfoFormGroup.valueChanges.subscribe(val => {
      console.warn("val", val);
    });
  }

  onToggleMultipleMembers(changes) {
    console.warn("changes", changes)
    if(changes.value === true) {
      this.householdFormGroup.patchValue({
        hasMultipleHouseMembers: true,
      });
    } else {
      this.householdFormGroup.patchValue({
        hasMultipleHouseMembers: false,
        members: [],
      });
    }
  }

  onAddMember() {
    this.householdMembers.push(this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      relation: ['', Validators.required],
    }));
  }
}
