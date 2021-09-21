import {Component, OnInit} from '@angular/core';
import {FormGroup,  FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  title = 'public-web';

  familyRelations = [
    'sister', 'brother', 'father'
  ];

  taxReturnTypes: string;
  returnTypes: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }
}
