import {Component, OnInit} from '@angular/core';
import {Restaurant} from "./restaurant/restaurant.model";
import {RestaurantsService} from "./restaurants.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {trigger, state, style, transition, animate} from "@angular/animations"
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/from";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
      trigger('toggleSearch', [
          state('hidden', style({
              opacity: 0,
              "max-height": '0px'
          })),
          state('visible', style({
              opacity: 1,
              "max-height": '70px',
              "margin-top": '20px'
          })),
          transition('* => *', animate('300ms 0s ease-in-out'))
      ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl    //preciso pare ter referência a ele, e poder "ouvir" valores digitados

  constructor(private restaurantsService: RestaurantsService,
              private fb: FormBuilder) {}

  ngOnInit() {

    //instanciar o "searchControl" fora, pois precisa de uma referência
    this.searchControl = this.fb.control('')
    //passando um objeto com uma série de propriedades
    this.searchForm = this.fb.group({
        searchControl: this.searchControl
    })

    //se inscrever na propriedade "valueChanges" do FormControl
    this.searchControl.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .switchMap(searchTerm =>
            this.restaurantsService
                .restaurants(searchTerm)
                .catch(error => Observable.from([])))
        .subscribe(restaurants => this.restaurants = restaurants)

    //passando o que receber para o valor da propriedade
    this.restaurantsService.restaurants()
        .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
