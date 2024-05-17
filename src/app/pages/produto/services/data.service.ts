import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  curDate = new BehaviorSubject<Date>(new Date());

  getCurDate(): Observable<Date> {
    return this.curDate.asObservable();
  }

  updateCurDate(): void {
    this.curDate.next(new Date());
  }
}
