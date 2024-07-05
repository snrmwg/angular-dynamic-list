import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicListComponent } from './dynamic-list.component';
import { Button } from 'primeng/button';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicListComponent, FormsModule, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  items: any[] = [
    { type: 'typeA', data: 'Data for A' },
    { type: 'typeB', data: 'Data for B', anotherValue: 42 }
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
  
  autoUpdateSub = interval(3_000).subscribe(() => {
    this.items = this.items.map((item, i) => {
      if (i === 1) {
        return { ...item, anotherValue: item.anotherValue + 1};
      }
      return item;
    });
  })

  addItem() {
    this.items.push({ type: 'typeA', data: 'New item' });
  }
}
