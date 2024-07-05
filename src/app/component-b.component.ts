import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ItemDataB } from "./types";
import { NgIf } from "@angular/common";

@Component({
  standalone: true,
  imports: [NgIf],
  template: `
    <p style="font-weight: bold;">B</p>
    <p>data: {{item.data}}, another value: {{item.anotherValue}} <button *ngIf="!overlay" (click)="clicked.emit($event)">click!</button></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentB {
  @Input() item!: ItemDataB;
  @Output() clicked = new EventEmitter<UIEvent>();
  @Input() overlay = false;
}

@Component({
  standalone: true,
  template: `
    <p><span style="font-weight: bold;">B</span> ({{item.data}}) <button (click)="clicked.emit($event)">click!</button></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentBsmall {
  @Input() item!: ItemDataB;
  @Output() clicked = new EventEmitter<UIEvent>();
}
