import { Component } from '@angular/core';

@Component({
  selector: 'forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent {
  public routeToAffidavit() {
    window.location.href = `/affidavit`;
  }
}
