import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'degla';
  constructor(private _Location: Location) { }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBack() {
    this._Location.back();
  }
}
