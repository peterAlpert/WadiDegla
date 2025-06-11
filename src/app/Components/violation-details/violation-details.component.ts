import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ViolationService } from '../../Services/violation.service';

@Component({
  selector: 'app-violation-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './violation-details.component.html',
})
export class ViolationDetailsComponent implements OnInit {
  member: any;
  note: string = '';
  date: string = '';
  time: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private violationService: ViolationService
  ) { }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.member = nav?.extras?.state?.['member'];

    const now = new Date();
    this.date = now.toISOString().split('T')[0];
    this.time = now.toTimeString().split(':').slice(0, 2).join(':');
  }

  saveViolation(type: string) {
    const violation = {
      name: this.member.memberName,
      membership: this.member.membership,
      note: this.note,
      date: this.date,
      time: this.time,
      type: type
    };

    this.violationService.saveViolation(violation).subscribe(() => {
      alert('تم الحفظ بنجاح');
      this.location.back();
    });
  }
}
