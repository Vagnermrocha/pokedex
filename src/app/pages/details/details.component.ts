import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Services
import { PokeApiService } from '../../service/poke-api.service';
import { forkJoin } from 'rxjs';
import { ScrollService } from '../../scroll.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = `https://pokeapi.co/api/v2/pokemon`;
  private urlName: string = `https://pokeapi.co/api/v2/pokemon-species`;

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
    private scrollService: ScrollService
  ) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.scrollService.setScroll(scrollY);
  }

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(
      `${this.urlPokemon}/${id}`
    );
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      //Faz os subscribe do pokemon e do name
      (res) => {
        this.pokemon = res; // A resposta do serviço das duas urls que está puxando
        this.isLoading = true;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }
}
