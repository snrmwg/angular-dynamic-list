import { NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { DynamicItemComponent } from "./dynamic-item";
import { ItemData } from "./types";

@Component({
  selector: 'app-dynamic-list',
  template: `
    <div *ngFor="let item of items">
      <app-dynamic-item
        [item]="item"
        [small]="small"
        (clicked)="updateLastClicked($event)" />
    </div>
    <p>last clicked: {{lastClickedState}}</p>
  `,
  imports: [DynamicItemComponent, NgFor],
  standalone: true,
  styles: [
    ':host { display: flex; flex-direction: column; gap: .5em;}',
    'div { border: 1px dotted black; padding: 1em; border-radius: 5px;box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);}'
  ]
})
export class DynamicListComponent {
  @Input() items!: ItemData[];
  @Input() small = false;

  lastClickedState = '';

  updateLastClicked(item: ItemData) {
    this.lastClickedState = `Last clicked: ${JSON.stringify(item)}`;
  }
}
