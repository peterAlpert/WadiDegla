import { SharedService } from './../../Services/shared.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  controlName: string | null = null;
  token: string | null = null;


  constructor(
    private _SharedService: SharedService,
    private _Router: Router
  ) { }

  ngOnInit(): void {

    this._SharedService.controlName$.subscribe(name => {
      this.controlName = name;
    });

    this._SharedService.token$.subscribe(token => this.token = token);
  }

  logout() {
    this._SharedService.clearToken();
    this._SharedService.clearControlName();
    this._Router.navigate(['/login'])
  }


}
