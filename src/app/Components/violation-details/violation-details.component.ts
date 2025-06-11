import { ToastrService } from 'ngx-toastr';
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
    private route: ActivatedRoute,
    private _ToastrService: ToastrService,
    private violationService: ViolationService
  ) { }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.member = nav?.extras?.state?.['member'];

    if (!this.member) {
      const membership = this.route.snapshot.paramMap.get('id');
      console.warn('العضو مش موجود في state، ممكن تجيب بياناته بـ id:', membership);
    }

    const now = new Date();
    this.date = now.toISOString().split('T')[0];
    this.time = now.toTimeString().split(':').slice(0, 2).join(':');
  }

  saveViolation(type: string) {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(':').slice(0, 2).join(':');

    const violation = {
      name: this.member.memberName,
      membership: this.member.membership,
      note: this.note,
      date: date,
      time: time,
      type: type
    };

    this.violationService.saveViolation(violation).subscribe(() => {
      this._ToastrService.success('تم الحفظ بنجاح');
      this.location.back();
    });
  }
}
