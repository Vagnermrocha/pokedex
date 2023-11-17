import { Component, HostListener, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';
import { ScrollService } from '../../scroll.service';


@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;


  constructor(
    private pokeApiService: PokeApiService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.pokeApiService.appListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = res.results;
        console.log(this.getAllPokemons)
      },
      error => {
        this.apiError = true;
      }
    );
  }

  @HostListener('window: scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.scrollService.setScroll(scrollY);
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;
  }

}
