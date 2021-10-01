import {Component,  OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'public-web-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  personalInfoFormGroup: FormGroup;
  houseMemberInfoFormGroup: FormGroup;
  houseIncomeInfoFormGroup: FormGroup;

  @ViewChild('signaturePad')
  signaturePad;
  sigWidth = 600;
  sigHeight = 100;

  ssnRegex = '[A-Za-z]{3}';


  taxReturnTypes = [
    'Joint return',
    'Individual return',
    'No return filed'
  ]

  // get householdControls() { return this.houseMemberInfoFormGroup.controls; }
  get householdMembers() { return this.houseMemberInfoFormGroup.controls.members as FormArray; }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.personalInfoFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      building: ['', Validators.required],
      aptNumber: ['', Validators.required],
      ssn: ['', Validators.required]
    });

    this.houseMemberInfoFormGroup = this._formBuilder.group({
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

    this.houseIncomeInfoFormGroup = this._formBuilder.group({
        grandTotalIncome: ['', Validators.required],
        dependentExemption: ['', Validators.required],
        taxpayerDeduction: ['', Validators.required],
        medicalDentalExpenses: ['', Validators.required],
        socialSecurityBenefits: ['' , Validators.required],
        total: ['' , Validators.required],
        adjustedHouseholdIncome: ['' , Validators.required]
    });

    this.personalInfoFormGroup.valueChanges.subscribe(val => {
      console.warn("personalInfoFormGroup val", val);
    });

    this.houseMemberInfoFormGroup.valueChanges.subscribe(val => {
      console.warn("houseMemberInfoFormGroup val", val);
    });

    this.houseIncomeInfoFormGroup.valueChanges.subscribe(val => {
      console.warn("houseIncomeInfoFormGroup val", val);
    });
  }

  onToggleMultipleMembers(changes) {
    if (changes.value === true) {
      this.houseMemberInfoFormGroup.patchValue({
        hasMultipleHouseMembers: true,
      });
    } else {
      this.houseMemberInfoFormGroup.patchValue({
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
