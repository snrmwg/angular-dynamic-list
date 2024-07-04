import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ItemData } from "./types";

@Component({
  standalone: true,
  selector: 'app-component-a',
  template: `
    <h2>Component A</h2>
    <p>data: {{item.data}} <button (click)="clicked.emit()">click!</button></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentA {
  @Input() item!: ItemData;
  @Output() clicked = new EventEmitter<void>();
}
