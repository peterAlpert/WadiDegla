import { HttpClient } from '@angular/common/http';
import { StadiumService } from './../../Services/stadium.service';
import { Iplayer } from './../../Interfaces/iplayer';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ViolationService } from '../../Services/violation.service';
import { IViolation } from '../../Interfaces/iviolation';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-violation-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './violation-history.component.html'
})
export class ViolationHistoryComponent implements OnInit {
  member: Iplayer = {} as Iplayer;
  violations: IViolation[] = [];


  constructor(
    private router: Router,
    private _StadiumService: StadiumService,
    private _HttpClient: HttpClient,
    private violationService: ViolationService) { }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.member = nav?.extras?.state?.['member'];

    if (this.member) {
      this.violationService.getMemberViolations(this.member.id).subscribe({
        next: (res: IViolation[]) => this.violations = res,
        error: (err) => console.error('Error fetching violations:', err)
      });
    }


  }


}
