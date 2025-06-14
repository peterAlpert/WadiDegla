import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntryService } from '../../Services/entry.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entry-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-history.component.html',
})
export class EntryHistoryComponent implements OnInit {
  member: any;
  entries: any[] = [];

  constructor(
    private router: Router,
    private entryService: EntryService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.member = nav?.extras?.state?.['member'];
  }

  ngOnInit() {
    if (this.member?.id) {
      this.entryService.getEntriesByMemberId(this.member.id).subscribe({
        next: (res: any) => this.entries = res,
        error: (err) => console.error('Error loading entries:', err)
      });
    }
  }
}
