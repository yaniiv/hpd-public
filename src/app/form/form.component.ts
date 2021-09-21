import {Component,  OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from '@angular/forms';
import {SimpleChanges} from '@angular/core';

@Component({
  selector: 'public-web-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  basicInfoFormGroup: FormGroup;
  householdFormGroup: FormGroup;
  incomeTaxGroup: FormGroup;

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
          firstName: ['dwdawd', Validators.required],
          lastName: ['dwadaw', Validators.required],
          age: ['', Validators.required],
          relation: ['', Validators.required],
        })
      ]),

    });
    this.incomeTaxGroup = this._formBuilder.group({
      incomeAndTax: ['', Validators.required]
    });

    this.basicInfoFormGroup.valueChanges.subscribe(val => {
      console.warn("val", val);
    });

    this.householdFormGroup.valueChanges.subscribe((changes) => this.handleHouseholdFormChanges(changes, this.householdFormGroup));
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
      });
    }
  }

  onSelectNumMembers(changes) {
    console.warn("onSelectNumMembers", changes)
    const newFormFields: AbstractControl[] = [];
    for (let i = 0; i<changes.value; i++) {
      newFormFields.push(
        this._formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          age: ['', Validators.required],
          relation: ['', Validators.required],
        })
      );

      this.householdFormGroup.controls.members = newFormFields;
    }
  }

  handleHouseholdFormChanges(changes, householdFormGroup) {
    console.warn("changes", changes);
    console.warn("householdFormGroup", householdFormGroup);
    const members = householdFormGroup.value.members;
    const numHouseMembers = householdFormGroup.value.numHouseMembers;
    console.warn("numHouseMembers", numHouseMembers);
    console.warn("members", members);
    // const numHouseMembers = changes.numHouseMembers;

    // console.warn("householdFormGroup.value.numHouseMembers", householdFormGroup.value.numHouseMembers)
    // console.warn("once", once)

      if (numHouseMembers === 0) {
        householdFormGroup.patchValue({
          numHouseMembers: 1,
          // hasMultipleHouseMembers: true,
          // members: [{a: "b"}]
        });
        // householdFormGroup.getValue('members').insert('1',
        //   this._formBuilder.group({
        //       name: ['', Validators.required],
        //       email: ['', [Validators.required, Validators.email]],
        //       hasMultipleHouseMembers: ['', [Validators.required, Validators.email]],
        //     }))
        console.warn('hi');
        // householdFormGroup.value.numHouseMembers += 1;
        //
        // console.warn("householdFormGroup", householdFormGroup)
        // // householdFormGroup.setValue("numHouseMembers", 1);
        // console.warn("householdFormGroup", householdFormGroup);
        //
        householdFormGroup.controls.members.push(this._formBuilder.group({
          name: ['from', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          hasMultipleHouseMembers: ['', [Validators.required, Validators.email]],
        }));

        // console.warn("this.householdFormGroup", this.householdFormGroup)
        // this.householdFormGroup.value.members.push([
        //
        // ])
      }

  }

}
