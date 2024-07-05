import { NgFor, NgIf } from "@angular/common";
import { Component, Input, ViewChild } from "@angular/core";
import { Button } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { DynamicItemClickEvent, DynamicListItemComponent, DynamicOverlayItemComponent } from "./dynamic-list-item";
import { ItemData } from "./types";

@Component({
  selector: 'app-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  imports: [DynamicListItemComponent, DynamicOverlayItemComponent, NgFor, NgIf, OverlayPanelModule, Button],
  standalone: true,
  styles: [
    ':host { display: flex; flex-direction: column; gap: .5em;}',
    'div.itm { border: 1px dotted black; padding: 1em; border-radius: 5px;box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);}'
  ]
})
export class DynamicListComponent {
  @Input({ required: true }) items!: ItemData[];
  @Input() small = false;
  @ViewChild('op') op!: OverlayPanel;

  lastClickedState = '';
  lastClickedItem?: ItemData;

  onItemClick($event: DynamicItemClickEvent) {
    this.lastClickedItem = $event.item;
    this.lastClickedState = `Last clicked: ${JSON.stringify($event.item)}`;
    if (this.op.overlayVisible) {
      this.op.hide();
      setTimeout(() => {
        this.op.show($event.event);
      }, 0)
    } else {
      this.op.show($event.event);
    }
  }
}
