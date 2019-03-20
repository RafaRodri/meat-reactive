import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http"

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Restaurant } from "./restaurant/restaurant.model";

import {MEAT_API} from "../app.api";
import {MenuItem} from "../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) {}

    restaurants(search?: string): Observable<Restaurant[]>{
        //para passar parâmetros, agora é necessário ter uma váriavel do tipo
        let params: HttpParams = undefined
        
        if (search){
            //instancia objeto do tipo HttpParams
            //o objeto HttpParams, é imutável, ou seja, sempre que setar um parâmetro, é adicionado um valor,
                //e é criado uma cópia, retornando uma instância de HttpParams
                //logo, o seguinte trecho não funcionaria:
                //params = new HttpParams()
                //params.set('q', search)
            params = new HttpParams().append('q', search)
            //é possível utilizar o método set() ou append(), para passar valor
        }

        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`,{params: params})
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
    }
}