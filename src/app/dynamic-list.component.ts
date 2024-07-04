import { Component, Input } from "@angular/core";
import { DynamicItemComponent } from "./dynamic-item";
import { CommonModule } from "@angular/common";
import { ItemData } from "./types";

@Component({
  selector: 'app-dynamic-list',
  template: `
    <div *ngFor="let item of items">
      <app-dynamic-item [item]="item" (clicked)="updateLastClicked($event)"></app-dynamic-item>
    </div>
    <p>last clicked: {{lastClickedState}}</p>
  `,
  imports: [DynamicItemComponent, CommonModule],
  standalone: true,
  styles: [
    ':host { display: flex; flex-direction: column; gap: .5em;}',
    'div { border: 1px dotted black; padding: 1em; border-radius: 5px;box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);}'
  ]
})
export class DynamicListComponent {
  @Input() items!: ItemData[];

  lastClickedState = '';

  updateLastClicked(item: ItemData) {
    this.lastClickedState = `Last clicked: ${JSON.stringify(item)}`;
  }
}
