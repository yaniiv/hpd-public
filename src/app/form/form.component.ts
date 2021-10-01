import {Component,  OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'public-web-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  basicInfoForm: FormGroup;
  householdInfoForm: FormGroup;
  incomeTaxForm: FormGroup;
  calculationsForm: FormGroup;

  @ViewChild('signaturePad')
  signaturePad;
  sigWidth = 600;
  sigHeight = 100;

  ssnRegex = '[A-Za-z]{3}';


  taxReturnTypes = [
    'Joint return',
    'Individual return',
    'No return filed'
  ];

  // get householdControls() { return this.householdInfoForm.controls; }
  get householdMembers() { return this.householdInfoForm.controls.members as FormArray; }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.basicInfoForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      building: ['', Validators.required],
      aptNumber: ['', Validators.required],
      ssn: ['', Validators.required]
    });

    this.householdInfoForm = this._formBuilder.group({
      hasMultipleHouseMembers:  [false, Validators.required],
      members: new FormArray([
        this._formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          dateOfBirth: ['', Validators.required],
          relation: ['', Validators.required],
          income: ['' ],
          taxReturnType: ['']
        })
      ]),
    });

    this.incomeTaxForm = this._formBuilder.group({
        grandTotalIncome: ['', Validators.required],
        dependentExemption: ['', Validators.required],
        taxpayerDeduction: ['', Validators.required],
        medicalDentalExpenses: ['', Validators.required],
        socialSecurityBenefits: ['' , Validators.required],
        total: ['' , Validators.required],
        adjustedHouseholdIncome: ['' , Validators.required]
    });

    this.calculationsForm = this._formBuilder.group({
      annualRent: ['', Validators.required],
      sixPercentEquity: [''],
      numRoomsPrice: [''],
      numAirConditions: ['', Validators.required],
      total: ['' , Validators.required],
      applicableRatio: ['' , Validators.required],
      maxAllowable: ['' , Validators.required],
      totalAdjustedHouseholdIncome: ['' , Validators.required],
      secondaryWageEarner: ['' , Validators.required],
      netIncome: ['' , Validators.required],
      amountOverIncome: ['' , Validators.required],
      percentOverIncome: ['' , Validators.required],
      surchargeToBeBilled: ['' , Validators.required],
      totalMonthlyBilling: ['' , Validators.required],
    });


    this.basicInfoForm.valueChanges.subscribe(val => {
      console.warn("basicInfoForm val", val);
    });

    this.householdInfoForm.valueChanges.subscribe(val => {
      console.warn("householdInfoForm val", val);
    });

    this.incomeTaxForm.valueChanges.subscribe(val => {
      console.warn("incomeTaxForm val", val);
    });

    this.calculationsForm.valueChanges.subscribe(val => {
      console.warn("incomeTaxForm val", val);
    });
  }

  onToggleMultipleMembers(changes) {
    if (changes.value === true) {
      this.householdInfoForm.patchValue({
        hasMultipleHouseMembers: true,
      });
    } else {
      this.householdInfoForm.patchValue({
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
