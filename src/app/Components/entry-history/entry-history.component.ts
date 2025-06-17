import { routes } from './../../app.routes';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntryService } from '../../Services/entry.service';
import { CommonModule } from '@angular/common';
import { ViolationService } from '../../Services/violation.service';
import { InjuryService } from '../../Services/injury.service';

@Component({
  selector: 'app-entry-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-history.component.html',
})
export class EntryHistoryComponent implements OnInit {
  member: any;
  memberId: number = 0;
  selectedSection: 'entry' | 'violation' | 'injury' = 'entry';

  entries: any[] = [];
  violations: any[] = [];
  injuries: any[] = [];

  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
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
}
