import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component'

import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from "./shared/shared.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { AplicationErrorHandler } from "./app.error-handler";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),   // importa o SharedModule + Providers
    //CoreModule,             // CoreModule se torna obsoleto
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }) // PreloadAllModules, carregando em background
  ],
  //quando alguém pedir a estratégia de localização, vamos usar outra classe, a HashLocationStrategy
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  //ou seja, sempre que um componente, pedir o toker chamado 'LOCALE_ID',
  //ele vai receber o valor 'pt-BR' e começar a trabalhar nesse padrão
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  { provide: ErrorHandler, useClass: AplicationErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
