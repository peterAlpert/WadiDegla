import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  controlName: string | null = '';
  constructor(private _location: Location) { }
  ngOnInit() {
    this.controlName = localStorage.getItem("controlName")
  }

  backClicked() {
    this._location.back();
  }

}
