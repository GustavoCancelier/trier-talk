import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-b',
  template: ` <h1>Component B</h1>
    <div>Observable com async: {{ curDate | async | date: 'longTime' }}</div>
    <div>
      <button (click)="update()">Atualizar</button>
    </div>`,
})
export class FilhoSecundarioComponent {
  curDate: Observable<Date>;

  constructor(public dataService: DataService) {
    this.curDate = dataService.getCurDate();
  }

  update() {
    this.dataService.updateCurDate();
  }
}
