import { routes } from './../../app.routes';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  memberId: string = '';
  entries: any[] = [];

  constructor(
    private router: Router,
    private entryService: EntryService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    const nav = this.router.getCurrentNavigation();
    this.member = nav?.extras?.state?.['member'];
  }

  ngOnInit() {
    this.memberId = this._ActivatedRoute.snapshot.params['memberId'];
    if (this.memberId) {
      this.entryService.getEntriesByMemberId(this.member.id).subscribe({
        next: (res: any) => { this.entries = res; console.log(res) },
        error: (err) => console.error('Error loading entries:', err)
      });
    }
  }
}
