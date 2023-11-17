import { Component } from '@angular/core';
import { ScrollService } from 'src/app/scroll.service';

@Component({
  selector: 'poke-header',
  templateUrl: './poke-header.component.html',
  styleUrls: ['./poke-header.component.scss'],
})
export class PokeHeaderComponent {
  isScrolled = false;

  constructor(private scrollService: ScrollService) {
    this.scrollService.scroll$.subscribe((scrollY) => {
      this.isScrolled = scrollY > 0;
    });
  }
}
