import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIf } from "@angular/common";
import { ItemData } from "./types";

@Component({
  standalone: true,
  imports: [NgIf],
  template: `
    <h2>Component A <button (click)="clicked.emit()">click!</button></h2>
    <p *ngIf="!small">data: {{item.data}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentA {
  @Input() item!: ItemData;
  @Input() small!: boolean;
  @Output() clicked = new EventEmitter<void>();
}
