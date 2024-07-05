import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ViewContainerRef } from '@angular/core';
import { ComponentA } from "./component-a.component";
import { ComponentB, ComponentBsmall } from "./component-b.component";
import { ItemData } from "./types";

const componentMapping: Record<string, any> = {
  'typeA': ComponentA,
  'typeB': ComponentB,
};

const componentMapping_small: Record<string, any> = {
  'typeA': ComponentA,
  'typeB': ComponentBsmall,
};

@Component({
  selector: 'app-dynamic-item',
  template: `<ng-container #vcr />`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicItemComponent implements OnInit, OnDestroy, OnChanges {

  @Input() item!: ItemData;
  @Input() small!: boolean;
  @Output() clicked = new EventEmitter<ItemData>();
  @ViewChild('vcr', { static: true, read: ViewContainerRef }) vcr!: ViewContainerRef;

  private componentRef: any;

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    let component = this.small
      ? componentMapping_small[this.item.type]
      : componentMapping[this.item.type];

    this.vcr.clear();

    this.componentRef = this.vcr.createComponent(component);

    this.componentRef.instance.item = this.item;
    this.componentRef.instance.small = this.small;

    if (this.componentRef.instance.clicked) {
      this.componentRef.instance.clicked.subscribe((event: any) => {
        //console.log('Event from dynamic component:', event);
        this.clicked.emit(this.item);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadComponent();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy()
    }
  }

}
