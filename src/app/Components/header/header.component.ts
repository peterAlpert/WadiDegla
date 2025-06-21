import { SharedService } from './../../Services/shared.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  controlName: string | null = null;

  constructor(
    private _SharedService: SharedService
  ) { }

  ngOnInit(): void {

    this._SharedService.controlName$.subscribe(name => {
      this.controlName = name;
    });
  }


}
