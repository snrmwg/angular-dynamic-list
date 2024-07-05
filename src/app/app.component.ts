import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicListComponent } from './dynamic-list.component';
import { ItemData, ItemDataB } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicListComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  items: ItemData[] = [
    { type: 'typeA', data: 'Data for A' } as ItemData,
    { type: 'typeB', data: 'Data for B', anotherValue: 42 } as ItemDataB
    // Add more items as needed
  ];

  small_mode = true;

  updateData(index: number) {
    let newData = `Updated data @ ${new Date().toLocaleTimeString()}`;

    // set items array to a new array reference to trigger change detection
    this.items = this.items.map((item, i) => {
      if (i === index) {
        return { ...item, data: newData };
      }
      return item;
    });
  }
  
  
  addItem() {
    this.items.push({ type: 'typeA', data: 'New item' });
  }
}
