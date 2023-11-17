import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject = new Subject<number>();
  scroll$ = this.scrollSubject.asObservable();

  setScroll(scrollY: number): void {
    this.scrollSubject.next(scrollY);
  }

  constructor() { }
}
