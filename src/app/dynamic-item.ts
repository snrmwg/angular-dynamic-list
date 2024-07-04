import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { ComponentA } from "./component-a.component";

import { ViewContainerRef } from '@angular/core';
import { ComponentB } from "./component-b.component";
import { ItemData } from "./types";

const componentMapping: Record<string, any> = {
  'typeA': ComponentA,
  'typeB': ComponentB,
};

@Component({
  selector: 'app-dynamic-item',
  template: `<ng-container #vcr />`,
  standalone: true,
  imports: [CommonModule, ComponentA]
})
export class DynamicItemComponent implements OnInit, OnDestroy {
  @Input() item!: ItemData;
  @Output() clicked = new EventEmitter<ItemData>();
  @ViewChild('vcr', {static: true, read: ViewContainerRef}) vcr!: ViewContainerRef;

  private componentRef: any;
  
  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    const component = componentMapping[this.item.type];
    this.vcr.clear();

    this.componentRef = this.vcr.createComponent(component);

    this.componentRef.instance.item = this.item;

    if (this.componentRef.instance.clicked) {
      this.componentRef.instance.clicked.subscribe((event: any) => {
        //console.log('Event from dynamic component:', event);
        this.clicked.emit(this.item);
      });
    }
  }
  
  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy()
    }
  }
  
}
