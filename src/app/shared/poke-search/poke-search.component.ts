import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
import { ScrollService } from 'src/app/scroll.service';

@Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent implements OnInit {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
  }

 @HostListener('window.scroll', [])
 onWindowScroll() {
  const scrollY = window.scrollY;
  this.scrollService.setScroll(scrollY);
 }

  public search(value: string) {
    this.emmitSearch.emit(value);
  }

}
