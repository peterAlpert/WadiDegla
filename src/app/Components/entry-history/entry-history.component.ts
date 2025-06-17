import { HttpClient } from '@angular/common/http';
import { StadiumService } from './../../Services/stadium.service';
import { routes } from './../../app.routes';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntryService } from '../../Services/entry.service';
import { CommonModule } from '@angular/common';
import { ViolationService } from '../../Services/violation.service';
import { InjuryService } from '../../Services/injury.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-entry-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-history.component.html',
})
export class EntryHistoryComponent implements OnInit {
  member: any;
  memberId: number = 0;
  allData: any[] = [];
  filteredData: any[] = [];
  selectedSection: 'entry' | 'violation' | 'injury' = 'entry';

  entries: any[] = [];
  violations: any[] = [];
  injuries: any[] = [];

  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _StadiumService: StadiumService,
    private _HttpClient: HttpClient,
    private entryService: EntryService,
    private violationService: ViolationService,
    private injuryService: InjuryService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.member = nav?.extras?.state?.['member'];
  }

  ngOnInit() {
    this.memberId = this._ActivatedRoute.snapshot.params['memberId'];

    if (this.memberId) {
      this.loadEntries();
      this.loadViolations();
      this.loadInjuries();
    }

    this._StadiumService.getAll().subscribe((res: any) => {
      this.allData = res;
      this.filteredData = res;
    });

    this.getAllData();
  }

  showSection(section: 'entry' | 'violation' | 'injury') {
    this.selectedSection = section;
  }

  loadEntries() {
    this.entryService.getEntriesByMemberId(this.memberId).subscribe({
      next: (res: any) => (this.entries = res),
      error: (err) => console.error('Error loading entries:', err),
    });
  }

  loadViolations() {
    this.violationService.getMemberViolations(this.memberId).subscribe({
      next: (res) => (this.violations = res),
      error: (err) => console.error('Error loading violations:', err),
    });
  }

  loadInjuries() {
    this.injuryService.getByMemberId(this.memberId).subscribe({
      next: (res: any) => (this.injuries = res),
      error: (err) => console.error('Error loading injuries:', err),
    });
  }

  getAllData() {
    this._HttpClient.get<any[]>(`${environment.baseUrl}/Entry/first-entries`).subscribe((res) => {
      this.allData = res;
      this.filteredData = res;
    });
  }

  filterByStadium(no: number) {
    this.filteredData = this.allData.filter(x => x.stadeNo == no);
  }

  showAll() {
    this.filteredData = this.allData;
  }
}
