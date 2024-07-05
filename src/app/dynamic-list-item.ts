import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ViewContainerRef } from '@angular/core';
import { ComponentA, ComponentAoverlay } from "./component-a.component";
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

const componentMapping_overlay: Record<string, any> = {
  'typeA': ComponentAoverlay,
  'typeB': ComponentB,
};

export type DynamicItemClickEvent = { item: ItemData, event: UIEvent };

@Component({
  selector: 'app-dynamic-list-item',
  template: `<ng-container #vcr />`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicListItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input({ required: true }) item!: ItemData;
  @Input() small!: boolean;
  @Output() clicked = new EventEmitter<DynamicItemClickEvent>();
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
      this.componentRef.instance.clicked.subscribe((event: UIEvent) => {
        //console.log('Event from dynamic component:', event);
        this.clicked.emit({ item: this.item, event });
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

@Component({
  selector: 'app-dynamic-overlayitem',
  standalone: true,
  template: `<ng-container #vcr />`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicOverlayItemComponent implements OnInit, OnDestroy {
  @Input() item?: ItemData;
  @ViewChild('vcr', { static: true, read: ViewContainerRef }) vcr!: ViewContainerRef;
  private componentRef: any;

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    if (this.componentRef) {
      this.componentRef.destroy()
      this.componentRef = null;
    }
    let component = this.item && componentMapping_overlay[this.item.type];
    this.vcr.clear();
    if (component) {
      this.componentRef = this.vcr.createComponent(component);
      this.componentRef.instance.item = this.item;
      this.componentRef.instance.overlay = true;
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
