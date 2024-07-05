import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIf } from "@angular/common";
import { ItemData } from "./types";

@Component({
  standalone: true,
  imports: [NgIf],
  template: `
    <h2>Component A <button (click)="clicked.emit($event)">click!</button></h2>
    <p *ngIf="!small">data: {{item.data}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentA {
  @Input() item!: ItemData;
  @Input() small!: boolean;
  @Output() clicked = new EventEmitter<UIEvent>();
}

@Component({
  standalone: true,
  template: `
    <h3>Component A overlay</h3>
    <p>data: {{item.data}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentAoverlay {
  @Input() item!: ItemData;
}
