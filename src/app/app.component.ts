import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  title = 'pokedex';
  browser = false;
  constructor(
    @Inject(PLATFORM_ID) platformId: String
  ){
    this.browser = isPlatformBrowser(platformId);
  }
}
