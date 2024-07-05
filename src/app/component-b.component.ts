import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ItemDataB } from "./types";

@Component({
  standalone: true,
  template: `
    <p style="font-weight: bold;">B</p>
    <p>data: {{item.data}}, another value: {{item.anotherValue}} <button (click)="clicked.emit()">click!</button></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentB {
  @Input() item!: ItemDataB;
  @Output() clicked = new EventEmitter<void>();
}

@Component({
  standalone: true,
  template: `
    <p><span style="font-weight: bold;">B</span> ({{item.data}}) <button (click)="clicked.emit()">click!</button></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentBsmall {
  @Input() item!: ItemDataB;
  @Output() clicked = new EventEmitter<void>();
}
