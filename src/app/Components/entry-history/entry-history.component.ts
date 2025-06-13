import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-history.component.html',
})
export class EntryHistoryComponent {
  member: any;
  entries: any[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.member = nav?.extras?.state?.['member'];
  }

  ngOnInit() {
    if (this.member?.id) {
      // استدعاء الـ API للحصول على سجلات الدخول الخاصة بالعضو
      // مثال وهمي:
      // this.api.getEntriesByMemberId(this.member.id).subscribe(res => this.entries = res);
    }
  }
}
