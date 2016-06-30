import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { TodoComponent } from './todo.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import {HTTPTestComponent} from "./http-test.component";

@Component({
  selector: 'my-app',
  templateUrl: '/templates/header.html',
//  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES,HTTPTestComponent],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
})

@RouteConfig([
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
    useAsDefault: true
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterComponent
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/todo',
    name: 'Todo',
    component: TodoComponent
  }
])

export class AppComponent {
  title = 'Noteable';
}